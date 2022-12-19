import { MongoClient } from "mongodb";
import dotenv from "dotenv"
import mongoose, { Schema } from "mongoose";

dotenv.config()

const uri = process.env.MONGO_URI

async function main(){
await mongoose.connect(uri)

console.log("connected")

}
main().catch(error => console.log("db connection error", error))