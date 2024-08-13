import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import User from '@/models/userModel';


const connectToDatabase = async () => {
    const mongoUri = process.env.MONGODB_URI;
  
    if (!mongoUri) {
      throw new Error('MONGODB_URI is not defined');
    }
  
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(mongoUri);
    }
  };

export async function GET(request: Request, { params }: { params: { id: string } }) {
    await connectToDatabase();

    try {
        const movie = await User.findById(params.id);
        if (!movie) {
            return NextResponse.json({ message: 'Film non trouvé' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: movie });
    } catch (error) {
        return NextResponse.json({ message: 'Erreur de serveur' }, { status: 500 });
    }
}

// Fonction DELETE pour supprimer un utilisateur par son ID
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    await connectToDatabase();

    try {
        const movie = await User.findByIdAndDelete(params.id);
        if (!movie) {
            return NextResponse.json({ message: 'Film non trouvé' }, { status: 404 });
        }
        return NextResponse.json({ success: true, message: 'Film supprimé avec succès' });
    } catch (error) {
        return NextResponse.json({ message: 'Erreur de serveur' }, { status: 500 });
    }
}

// Fonction PUT pour mettre à jour un utilisateur par son ID
export async function PUT(request: Request, { params }: { params: { id: string } }) {
    await connectToDatabase();

    try {
        const data = await request.json();
        const movie = await User.findByIdAndUpdate(params.id, data, { new: true, runValidators: true });
        if (!movie) {
            return NextResponse.json({ message: 'Film non trouvé' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: movie });
    } catch (error) {
        return NextResponse.json({ message: 'Erreur de serveur' }, { status: 500 });
    }
}