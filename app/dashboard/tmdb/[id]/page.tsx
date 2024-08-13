"use client";
import React, { useEffect, useState } from 'react';
import Layout from '../../components/layout'; // Assurez-vous que le chemin est correct

type Props = {
    params: {
        id: number;
    }
}

type Genre = {
  id: number;
  name: string;
};

type Movie = {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    release_date: string;
    genres: Genre[];
    director: string;
    vote_average: number;
};

export default function Page({ params }: Props) {
    const [movie, setMovie] = useState<Movie | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMovie = async (id: number) => {
            try {
                const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=fr-FR`, {
                    headers: {
                        accept: "application/json",
                        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NjVmM2E4NDVmMjVmNjRhM2ZjYzkxNjIwMTZmM2E1NiIsIm5iZiI6MTcyMjkzOTYyNi44MzY2MjcsInN1YiI6IjY2YWExYzk3MDJiOGY2MWU2OTE5NDdkNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6IOKeqC-OtCiHxzrraXu0yPZ4upKmBgz5fs7-BRpem4",
                    },
                });
                const data = await res.json();
                setMovie(data);
            } catch (error) {
                setError("Une erreur s'est produite lors de la récupération des données du film.");
            } finally {
                setLoading(false);
            }
        };

        fetchMovie(params.id);
    }, [params.id]);

    const imgBasePath = 'https://media.themoviedb.org/t/p/w220_and_h330_face';
    const imageBaseURL = "https://media.themoviedb.org/t/p/w300_and_h450_bestv2";

    const addMovie = async () => {
        if (!movie) return;

        try {
            const imagePoster = imgBasePath + movie.poster_path;
            const resp = await fetch('http://localhost:3000/api/admin/movies', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: movie.title,
                    image: imagePoster,
                    description: movie.overview,
                    release_date: movie.release_date,
                    genre: movie.genres.map((genre) => genre.name).join(', '),
                }),
            });
            const result = await resp.json();
            if (resp.ok) {
                alert('Film ajouté à la base de données');
                console.log(imgBasePath + movie.poster_path)
            } else {
                alert(`Erreur: ${result.message}`);
            }
        } catch (error) {
            console.log(error);
        }
    }

    if (loading) return <div>Chargement...</div>;
    if (error) return <div>{error}</div>;

    if (!movie) return <div>Film non trouvé.</div>;

    return (
        <Layout>
            <div className="container mx-auto p-6">
                <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="md:w-1/3 p-4">
                        <img
                            src={`${imageBaseURL}${movie.poster_path}`}
                            alt={movie.title}
                            className="w-full h-auto object-cover rounded"
                        />
                    </div>
                    <div className="md:w-2/3 p-4">
                        <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
                        <p className="text-gray-600 mb-2"><strong>Date de sortie:</strong> {new Date(movie.release_date).toLocaleDateString('fr-FR')}</p>
                        <p className="text-gray-600 mb-2"><strong>Genre:</strong> {movie.genres.map((genre) => genre.name).join(', ')}</p>
                        <p className="text-gray-600 mb-2"><strong>Réalisateur:</strong> {movie.director}</p>
                        <p className="text-gray-600 mb-2"><strong>Note moyenne:</strong> {movie.vote_average}</p>
                        <p className="text-gray-800 mb-4">{movie.overview}</p>
                        <button
                            onClick={addMovie}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                            Ajouter à la base de données
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
