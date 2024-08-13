import client from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "DELETE") {
    try {
      const clientP = await client;
      const db = clientP.db("movies_project");

      const result = await db.collection("comments").deleteOne({ _id: new ObjectId(id) });

      if (result.deletedCount === 1) {
        res.status(200).json({ message: "Commentaire supprimé" });
      } else {
        res.status(404).json({ error: "Commentaire non trouvé" });
      }
    } catch (error) {
      res.status(500).json({ error: "Erreur de serveur" });
    }
  } else {
    res.status(405).json({ error: "Méthode non autorisée" });
  }
}
