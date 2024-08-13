import  client  from "../../lib/mongodb"
import { ObjectId } from "mongodb";


export default async function handler(req, res) {
    const clientP = await client;
    const db = client.db('movies_project')

    if (req.method === 'GET') {
        const { movie_id } = req.query;
        try {
            const comments = await db.collection('comments').find({ movie_id: new ObjectId(movie_id) }).limit(10).toArray();
            res.status(200).json({comments})
        } catch (error) {
            res.status(500).json({ message: "Failed to fetch comments", error});
        }
    }

    else if (req.method === 'POST') {
        const { movie_id, comment, user_id } = req.body;
        if ( !movie_id || !comment || !user_id ) {
            res.status(400).json({ message: 'Missing required fields' });
            return;
        }

        try {
            const newComment = {
                movie_id: new ObjectId(movie_id),
                comment,
                user_id,
            }
            await db.collection('comments').insertOne(newComment);
            res.status(201).json(newComment)
        } catch (error) {
            res.status(500).json({message: "Failed to add comment", error})
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' })
    }
}