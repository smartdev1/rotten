"use client";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function UserProfile() {
  const { data: session } = useSession();
  console.log(session)
  if (!session) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <p className="text-lg font-semibold">Vous devez être connecté pour accéder à cette page.</p>
          <Link href="/login" className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Connexion
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gray-800 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="text-white text-lg font-semibold">MyApp</div>
          <div className="flex items-center space-x-4">
            <Link href={`/userDetail/${session.id}`} className="text-white hover:text-gray-300">
              Modifier le Profil
            </Link>
            <button
              onClick={() => signOut()}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h1 className="text-2xl font-semibold mb-4">Profil de {session.username}</h1>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">Nom d'utilisateur :</span>
              <span className="text-gray-900">{session.username}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">Email :</span>
              <span className="text-gray-900">{session.email}</span>
            </div>
            {/* <div className="flex justify-between">
              <span className="font-medium text-gray-700">ID :</span>
              <span className="text-gray-900">{session.id}</span>
            </div> */}
          </div>
        </div>
      </main>
    </div>
  );
}
