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

// Fonction pour créer un film
export async function POST(req: NextRequest) {
  await connectToDatabase();

  try {
    const body = await req.json();
    const { title, image, description, release_date, genre, rating, average_rating } = body;

    if (!title || !description || !release_date || !genre ) {
      return NextResponse.json({ message: 'All fields are required', success: false }, { status: 400 });
    }

    const existingMovie = await Comments.findOne({ title });
    if (existingMovie) {
      return NextResponse.json({
        message: 'Le film existe déjà dans la base de données',
        success: false,
      }, { status: 400 });
    }

    const newMovie = new Comments({
      title,
      image,
      description,
      release_date,
      genre,
      ratings: rating ? [{ rating }] : [],
      average_rating: average_rating || 0,
    });

    const savedMovie = await newMovie.save();
    return NextResponse.json({
      message: 'Nouveau film ajouté',
      success: true,
      data: savedMovie,
    }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: 'Une erreur est survenue lors de l\'ajout du film',
      success: false,
    }, { status: 500 });
  }
}

// Fonction pour récupérer les films
export async function GET(req: NextRequest) {
  await connectToDatabase();

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (id) {
      const movie = await Comments.findById(id);
      if (!movie) {
        return NextResponse.json({ message: 'Film non trouvé', success: false }, { status: 404 });
      }
      return NextResponse.json({ success: true, data: movie });
    } else {
      const movies = await Comments.find({});
      return NextResponse.json({ success: true, data: movies });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: 'Une erreur est survenue lors de la récupération des films',
      success: false,
    }, { status: 500 });
  }
}

// Fonction pour mettre à jour un film
export async function PUT(req: NextRequest) {
  await connectToDatabase();

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const updateData = await req.json();

    if (!id) {
      return NextResponse.json({ message: 'ID est requis', success: false }, { status: 400 });
    }

    const updatedMovie = await Comments.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedMovie) {
      return NextResponse.json({ message: 'Film non trouvé', success: false }, { status: 404 });
    }

    return NextResponse.json({
      message: 'Film mis à jour avec succès',
      success: true,
      data: updatedMovie,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: 'Une erreur est survenue lors de la mise à jour du film',
      success: false,
    }, { status: 500 });
  }
}

// Fonction pour supprimer un film
export async function DELETE(req: NextRequest) {
  await connectToDatabase();

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ message: 'ID est requis', success: false }, { status: 400 });
    }

    const deletedMovie = await Comments.findByIdAndDelete(id);

    if (!deletedMovie) {
      return NextResponse.json({ message: 'Film non trouvé', success: false }, { status: 404 });
    }

    return NextResponse.json({
      message: 'Film supprimé avec succès',
      success: true,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: 'Une erreur est survenue lors de la suppression du film',
      success: false,
    }, { status: 500 });
  }
}
