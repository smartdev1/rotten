"use client";
import React, { useEffect, useState } from "react";
import Layout from '../../components/layout'; 

type Props = {
    params: {
        id: string;
    }
};

type Movie = {
    _id: number;
    title: string;
    overview: string;
    image: string;
};

export default function Page({ params }: Props) {
    const [movie, setMovie] = useState<Movie | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [form, setForm] = useState<Movie | null>(null);

    useEffect(() => {
        const fetchPageData = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/admin/movies/${params.id}`);
                if (!res.ok) {
                    throw new Error('Erreur lors de la récupération des données du film');
                }
                const data = await res.json();
                setMovie(data.data);
                setForm(data.data); // Initialisez le formulaire avec les données du film
            } catch (error) {
                setError('Une erreur s\'est produite lors de la récupération des données du film.');
            } finally {
                setLoading(false);
            }
        };

        fetchPageData();
    }, [params.id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm(prevForm => prevForm ? {
            ...prevForm,
            [e.target.name]: e.target.value,
        } : null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form) return;

        try {
            const resp = await fetch(`http://localhost:3000/api/admin/movies/${params.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });
            const result = await resp.json();
            if (resp.ok) {
                alert('Film mis à jour avec succès');
                setMovie(form); // Met à jour le film affiché avec les nouvelles données
            } else {
                alert(`Erreur: ${result.message}`);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async () => {
        if (!confirm('Êtes-vous sûr de vouloir supprimer ce film ?')) return;

        try {
            const resp = await fetch(`http://localhost:3000/api/admin/movies/${params.id}`, {
                method: 'DELETE',
            });
            if (resp.ok) {
                alert('Film supprimé avec succès');
                // Redirection ou mise à jour de l'interface après suppression
                window.location.href = '/dashboard/movies'; // Redirige vers la liste des films ou une autre page
            } else {
                const result = await resp.json();
                alert(`Erreur: ${result.message}`);
            }
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) return <div>Chargement...</div>;
    if (error) return <div>{error}</div>;
    if (!movie) return <div>Film non trouvé.</div>;

    return (
        <Layout>
            <div className="container mx-auto p-6">
                <h1 className="text-3xl font-bold mb-4">Détails et Modification du Film</h1>
                <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                    <h2 className="text-2xl font-semibold mb-4">{movie.title}</h2>
                    <img 
    src={movie.image} 
    alt={movie.title} 
    className="w-12 h-auto mb-4 rounded-lg" 
/>

                    <p className="text-gray-700 mb-4">{movie.overview}</p>
                </div>
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 mb-6">
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="title">Titre</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={form?.title || ''}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="overview">Résumé</label>
                        <textarea
                            id="overview"
                            name="overview"
                            value={form?.overview || ''}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="poster_path">Chemin de l'affiche</label>
                        <input
                            type="text"
                            id="poster_path"
                            name="poster_path"
                            value={form?.poster_path || ''}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        Enregistrer les modifications
                    </button>
                </form>
                <button
                    onClick={handleDelete}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                    Supprimer le Film
                </button>
            </div>
        </Layout>
    );
}
