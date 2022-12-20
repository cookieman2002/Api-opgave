import { decode } from "jsonwebtoken";
import ItemModel from "../../models/ItemModel.js";

export default async function (req, res) {
  const id = req.params.id;

  const [bearer, token] = req.headers.authorization.split(" ");

  const decoded = decode(token);

  console.log(decoded.role.permissions);

if(decoded.role.permissions.includes("delete")){
    try {
      const deletedItem = await ItemModel.findOneAndDelete({_id: id})
      if(deletedItem) {
          res.status(200)
          res.send({message: "this item has been deleted"})
          res.end()
      }
      else{
          console.log("this user does'nt exist")
          res.status(400)
          res.end()
      }
    } catch (error) {
      console.log("something went wrong with delete item", error)
    }
}
else{
    res.status(400)
    res.end()
    console.log("you are not allowed")
}

}
