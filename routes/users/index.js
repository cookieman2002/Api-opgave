import createUser from "./createUser.js"
import getAllUsers from "./getUser.js"
import updateUser from "./updateUser.js"
export default function users(app){
app.route("/api/v1/users/:id?")
.post(createUser)
.get(getAllUsers)
.patch(updateUser)
}