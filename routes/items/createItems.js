import ItemModel from "../../models/ItemModel.js"


export default async function createItems(req, res) {

   


    try{
        const document = {
            ...req.body,
            image: {...req.file}
            }

            const item = new ItemModel(document)
            
                
               await item.save()
               
                console.log(req.body)
                console.log(req.file)
                
                res.status(201)
                res.json(item)
                res.end()
            
    }
    catch(error){
        if(error._message){
            res.status(400)
            res.end()
        }


        console.log("create item error", error)
    res.status(500)
    res.end()
    } 


    
}