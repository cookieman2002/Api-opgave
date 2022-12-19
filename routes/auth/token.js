import Jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../..models/userModel.js";
import bcrypt from "bcrypt";

dotenv.config();

export default async function token(req, res) {
  if (!req.body.username || !req.body.password) {
    res.status(400);
    res.end();
    return;
  }

  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      res.status(403);
      res.end();
      return;
    }
    if (!(await bcrypt.compare(req.body.password, user.password))) {
      res.status(403);
      res.end();
      return;
    }

    const newToken = Jwt.sign(
      { username: user.username },
      process.env.TOKEN_SECRET,
      { expiresIn: "1hr" }
    );

    res.status(201);
    res.send(newToken);
    res.end();
  } catch (error) {
    console.log("authorization token error");
    res.status(500);
    res.end();
  }
}
