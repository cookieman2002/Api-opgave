import {model, Schema} from "mongoose"

const imageSchema = new Schema({
    orignalname: String,
    mimetype: String,
    size: Number,
    path: String,
    filename: String
})
const ItemSchema = new Schema({
    name: String,
    desc: String,
    price: {
        type: String,
        required: [true, "you must provide a price"],
    },
    image: imageSchema  
    
})


const ItemModel = model("items", ItemSchema)

export default ItemModel 