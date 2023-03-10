import Jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../../models/userModel.js";
import bcrypt from "bcrypt";

dotenv.config();

export default async function token(req, res) {
  if (!req.body.email || !req.body.password) {
    res.status(400);
    res.end();
    return;
  }

  try {
    const user = await User.findOne({ email: req.body.email }).populate("role");

    if (!user) {
      res.status(403);
      res.end();
      return;
    }

    console.log(user);

    if (!(await bcrypt.compare(req.body.password, user.password))) {
      res.status(403);
      res.end();
      return;
    }

    const newToken = Jwt.sign(
      { email: user.email, role: user.role },
      process.env.TOKEN_SECRET,
      {
        expiresIn: "24hr",
      }
    );

    res.status(201);
    res.send(newToken);
    res.end();
  } catch (error) {
    console.log("authorization token error", error);
    res.status(500);
    res.end();
  }
}
