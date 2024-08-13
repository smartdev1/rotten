import client from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const db = client.db("movies_project"); 
    const User = db.collection("users"); 
    const { email } = await req.json();

    const user = await User.findOne({ email }, { projection: { _id: 1 } });

    console.log("user:", user);

    return NextResponse.json({ user });
  } catch (error) {
    console.log("Error:", error);
    return NextResponse.json(
      {
        message: "An error occurred while fetching the user.",
      },
      { status: 500 }
    );
  }
}
