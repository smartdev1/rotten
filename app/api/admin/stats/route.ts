import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Movies from '@/models/moviesModel';
import User from '@/models/userModel';
import Comments from '@/models/commentsModel';

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
    const filmCount = await Movies.countDocuments();
    const userCount = await User.countDocuments();
    const commentCount = await Comments.countDocuments();

    return NextResponse.json({
      success: true,
      data: {
        films: filmCount,
        users: userCount,
        comments: commentCount,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: 'Une erreur est survenue lors de la récupération des statistiques',
      success: false,
    }, { status: 500 });
  }
}
