import dotenv from "dotenv";
import { User } from "../../models/userModel.js";


dotenv.config();

function URLBuilder(id, resource) {
  return process.env.HOST_ADDRESS + `/${resource}/${id}`;
}

export default async function getAllUsers(req, res) {
  const id = req.params.id;

  const limit = parseInt(req.query.limit || 20);
  const skip = parseInt(req.query.skip || 0);
  const idQuery = id ? { _id: ObjectId(id) } : {};
  const result = await User.find(idQuery)
    .select("-password")
    .populate("role")
    .limit(limit)
    .skip(skip);
  const length = await User.countDocuments();

  const nextLink =
    skip + limit >= length
      ? null
      : process.env.HOST_ADDRESS + `/items?limit=${limit}&skip=${skip + limit}`;
  const previousLink =
    skip === 0
      ? null
      : process.env.HOST_ADDRESS +
        `/items?=limit=${limit}&skip=${skip - limit < 0 ? 0 : skip - limit}`;

  const presentation = {
    count: length,
    previous: previousLink,
    next: nextLink,
    result: result.map((item) => ({
      ...item._doc,
      url: URLBuilder(item._id, "items"),
    })),
  };

  res.json(id ? { ...result[0] } : presentation);
  res.end();
}
