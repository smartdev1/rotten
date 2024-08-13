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

export async function GET(req: NextRequest) {
  await connectToDatabase();

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (id) {
      const movie = await User.findById(id);
      if (!movie) {
        return NextResponse.json({ message: 'Utilisateur non trouvé', success: false }, { status: 404 });
      }
      return NextResponse.json({ success: true, data: movie });
    } else {
      const movies = await User.find({});
      return NextResponse.json({ success: true, data: movies });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: 'Une erreur est survenue lors de la récupération des utilisateurs',
      success: false,
    }, { status: 500 });
  }
}