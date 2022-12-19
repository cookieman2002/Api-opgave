import bcrypt from "bcrypt";
import { User } from "../../models/userModel.js";


export default async function createUser(req, res) {


  if (!req.body.email || !req.body.password) {
    res.status(400);
    res.end();
    return;
  }

  const check = await User.findOne({email: req.body.email})

  if(check){
    res.status(403)
    res.end()
    return
  }
  
  const saltRound = 10;
  const hash = await bcrypt.hash(req.body.password, saltRound); 


  try {
    
    
    const user = new User({
      email: req.body.email,
      password: hash,
      role: req.body.role
    });
    await user.save();
    res.status(201);
    res.json(user);
    res.end();
  } catch (error) {
    if (error._message) {
      res.status(400);
      res.end();
    }
    console.log("create user Error", error);
    res.status(500);
    res.end();
  }
  console.log(hash);

  res.end();
}
