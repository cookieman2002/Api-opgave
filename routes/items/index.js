import upload from "../../middlewares/upload.js"
import createItems from "./createItems.js"
import getItems from "./getItems.js"
import updateItems from "./updateItems.js"
export default function items (app) {
app.route("/api/v1/items/:id?")
.get(getItems)
.post(upload.single("image"), createItems)
.patch(upload.single("image"), updateItems)
}