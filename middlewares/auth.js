import Jwt from "jsonwebtoken"
import token from "../routes/auth/token.js"
import dotenv from "dotenv"

dotenv.config()

export default function authorization(req, res, next){
    if(!req.headers.authorization){
        res.status(401)
        res.end()
        return
    }
    const header = req.headers.authorization.split(" ")
    if(header.length !== 2 && header[0].toLowerCase() !== " Bearer"){
        res.status(403)
        res.end()
        return
    }

    try {
        Jwt.verify(header[1], process.env.TOKEN_SECRET)
        next()

    }
    catch(error){
        res.status(403)
        res.end()
        return
    }

}