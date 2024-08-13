import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import User from '@/models/userModel';

// Fonction pour se connecter à MongoDB
const connectToDatabase = async () => {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error('MONGODB_URI is not defined');
  }

  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(mongoUri);
  }
};

// Fonction pour récupérer les utilisateurs récents
export async function GET(req: NextRequest) {
  await connectToDatabase();

  try {
    const users = await User.find({})
      .sort({ createdAt: -1 })
      .limit(5); 

    return NextResponse.json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: 'Une erreur est survenue lors de la récupération des utilisateurs récents',
      success: false,
    }, { status: 500 });
  }
}
