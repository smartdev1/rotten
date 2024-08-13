import client from "../../lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(req, res) {
    try {
        const clientP = await client
        const db = client.db("movies_project");

        const movie = await db.collection("movies").countDocuments();
        return NextResponse.json({
            success: true,
            movieCount: movie
        })
    } catch (error) {
        console.log(error);
        return NextResponse.error({
            status: 500,
            message: "Quelque chose s'est mal passé",
        })
    }
}