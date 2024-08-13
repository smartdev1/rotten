
import { ObjectId } from "mongodb";
import client from "../../lib/mongodb";

export default async function handle(req, res) {
  try {
    const clientP = await client;
    const db = clientP.db('movies_project');

    if (req.method === 'POST') {
      const { id } = req.query;
      const { rating } = req.body;
      console.log(rating);
      
      if (!id || !ObjectId.isValid(id)) {
        return res.status(400).json({ error: "ID invalide" });
      }

      if (typeof rating !== 'number' || rating < 1 || rating > 5) {
        return res.status(400).json({ error: "La rating doit être un nombre entre 1 et 5" });
      }

      const film = await db.collection('movies').findOne({ _id: new ObjectId(id) });

      if (!film) {
        return res.status(404).json({ error: "Film non trouvé" });
      }
      const ratings = Array.isArray(film.ratings) ? film.ratings : [];

      const updatedFilm = await db.collection('movies').findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $push: { ratings: rating } },
        { returnOriginal: false }
      );

      return res.status(200).json(updatedFilm.value);

    } else {

      const data = await db.collection('movies').find({}).limit(10).toArray();
      return res.status(200).json(data);
    }

  } catch (error) {
    console.error("Erreur lors de la connexion à la base de données :", error);
    return res.status(500).json({ error: "Erreur de connexion à la base de données" });
  }
}
