import { Schema, model } from "mongoose";

const RoleSchema = new Schema({
  name: {
    type: String,
    enum: ["admin", "partner", "default"],
    default: "default",
    // required: [true, "you must provide a role name"],
    // unique: true
  },
  desc: {
    type: String,
  },
  permissions: {
    type: Array,
  },
});

const Role = model("Role", RoleSchema);

const UserSchema = new Schema({
  email: {
    type: String,
    required: [true, "you must provide an email"],
  },
  password: {
    type: String,
    required: [true, "you must provide password"],
    minlength: 6,
  },
  role: {
    type: Schema.Types.ObjectId,
    ref: "Role",
    default: "63a02a4257c3a243b8b816de",
  },
});
const User = model("User", UserSchema);

export { User, Role };
