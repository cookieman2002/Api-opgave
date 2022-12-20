import authorization from "../../middlewares/auth.js"
import createUser from "./createUser.js"
import DeleteUser from "./deleteUser.js"
import getAllUsers from "./getUser.js"
import updateUser from "./updateUser.js"
export default function users(app){
app.route("/api/v1/users/:id?")
.post(createUser)
.get(getAllUsers)
.all(authorization)
.delete(DeleteUser)
.patch(updateUser)
}