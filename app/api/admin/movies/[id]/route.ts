import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Movies from '@/models/moviesModel';

const connectToDatabase = async () => {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error('MONGODB_URI is not defined');
  }

  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(mongoUri);
  }
};

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  await connectToDatabase();

  try {
    const movie = await Movies.findById(params.id);
    if (!movie) {
      return NextResponse.json({ message: 'Film non trouvé' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: movie });
  } catch (error) {
    console.error('Erreur serveur:', error);
    return NextResponse.json({ message: 'Erreur de serveur' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  await connectToDatabase();

  try {
    const movie = await Movies.findByIdAndDelete(params.id);
    if (!movie) {
      return NextResponse.json({ message: 'Film non trouvé' }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: 'Film supprimé avec succès' });
  } catch (error) {
    console.error('Erreur serveur:', error);
    return NextResponse.json({ message: 'Erreur de serveur' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  await connectToDatabase();

  try {
    const data = await request.json();
    const movie = await Movies.findByIdAndUpdate(params.id, data, { new: true, runValidators: true });
    if (!movie) {
      return NextResponse.json({ message: 'Film non trouvé' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: movie });
  } catch (error) {
    console.error('Erreur serveur:', error);
    return NextResponse.json({ message: 'Erreur de serveur' }, { status: 500 });
  }
}
