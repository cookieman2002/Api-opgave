import express from "express";
import "./database.js";
import items from "./routes/items/index.js"
import users from "./routes/users/index.js"
const app = express();

app.use(express.static("./public")); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
items(app)
users(app)

app.listen(8008, function () {
    console.log("The app is avaliable on port 8008")
});  
