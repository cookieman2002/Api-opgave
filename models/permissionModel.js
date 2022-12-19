import {Schema, model} from "mongoose"

const PermissionSchema = new Schema({
name: {
    type: String,
    required: [true, "you must provide a permission"],
    unique: true
    },
        desc: {
            type: String
        }

    }
)

const Permissions = model("Permissions", PermissionSchema)

export default Permissions