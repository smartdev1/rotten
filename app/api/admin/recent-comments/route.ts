import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Comments from '@/models/commentsModel';

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

// Fonction pour récupérer les commentaires récents
export async function GET(req: NextRequest) {
  await connectToDatabase();

  try {
    const comments = await Comments.find({})
      .sort({ createdAt: -1 }) 
      .limit(5);
    return NextResponse.json({
      success: true,
      data: comments,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: 'Une erreur est survenue lors de la récupération des commentaires récents',
      success: false,
    }, { status: 500 });
  }
}
