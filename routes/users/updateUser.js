import { decode } from "jsonwebtoken";
import { Role, User } from "../../models/userModel.js";

export default async function updateUser(req, res) {
  // for admin controls
  const user = await User.findById(req.params.id);

  const [bearer, token] = req.headers.authorization.split(" ");

  const decoded = decode(token);

  console.log(decoded.role.permissions);

  if (decoded.role.permissions.includes("write")) {
    
    try {
        user.role = req.body.role;
        
            await user.save();
            res.status(200)
            res.json(user)
            res.end()
        
    } catch (error) {
        res.status(500)
        console.log("update user went wrong", error)
        res.end()
    }

  } else {
    res.status(403);
    res.end();
    console.log("you are not allowed");
  }

  // end of admin controls


  if(decoded.role.permissions.includes("edit self")){

  }

}
