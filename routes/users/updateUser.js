import { Role, User } from "../../models/userModel.js";

export default function updateUser(res, req){    

User.findById(UserId, (error, user) => {
    if(error){

    }
    else{
        user.role = Role._id
        user.save((error) => {
            if(error){

            }
            else{
                console.log('Role assigned to user')
            }
        })
    }
})





}