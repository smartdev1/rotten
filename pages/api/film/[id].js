import  client  from "../../../lib/mongodb"
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
    const clientP = await client;
    const db = clientP.db('movies_project');

    const {id} = req.query;
    console.log(id);
    

    const movie = await db.collection('movies').findOne({_id: new ObjectId(id)})

    if (!movie) {
        res.status(404).json({ message: "Movie not found" });
        return;
    }

    res.json(movie)
}