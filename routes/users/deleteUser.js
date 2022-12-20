import { User, Role } from "../../models/userModel.js";

export default async function DeleteUser(req, res) {
  const id = req.params.id;

  const check = await User.findOne({ _id: id });

try {
    const deletedUser = await User.findOneAndDelete({ _id: id})
    if(deletedUser){
        res.status(200)
        res.send({message: "this user has been deleted"})
        res.end()
        console.log("this user has been deleted")

    }
    else{
        console.log("this user does'nt exist")
        res.status(400)
        res.end()
    }
    
} catch (error) {
    console.log("something went wrong with delete user", error)
}
  
}
