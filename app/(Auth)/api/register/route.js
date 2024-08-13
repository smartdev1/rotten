import client from "@/lib/mongodb"; 
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { username, email, password, role } = await req.json();
    const hashPassword = await bcrypt.hash(password, 15);
    const roleDefault = "user" 

    const db = client.db("movies_project"); 
    const User = db.collection("users"); 

    await User.insertOne({ username, email, password: hashPassword, role: roleDefault});

    console.log(email);
    console.log(password);
    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (error) {
    console.error("Error registering user:", error);
    return NextResponse.json(
      {
        message: "An error occurred while registering the user.",
      },
      { status: 500 }
    );
  }
}
