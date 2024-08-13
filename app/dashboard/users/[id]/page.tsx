"use client";
import React, { useEffect, useState } from "react";
import Layout from '../../components/layout'; 

type Props = {
    params: {
        id: string;
    }
};

type User = {
    _id: number;
    username: string;
    email: string;
    role: string;
};

export default function Page({ params }: Props) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [form, setForm] = useState<User | null>(null);

    useEffect(() => {
        const fetchPageData = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/admin/users/${params.id}`);
                if (!res.ok) {
                    throw new Error('Erreur lors de la récupération des données de l’utilisateur');
                }
                const data = await res.json();
                setUser(data.data);
                setForm(data.data); // Initialisez le formulaire avec les données de l’utilisateur
            } catch (error) {
                setError('Une erreur s\'est produite lors de la récupération des données de l’utilisateur.');
            } finally {
                setLoading(false);
            }
        };

        fetchPageData();
    }, [params.id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm(prevForm => prevForm ? {
            ...prevForm,
            [e.target.name]: e.target.value,
        } : null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form) return;

        try {
            const resp = await fetch(`http://localhost:3000/api/admin/users/${params.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });
            const result = await resp.json();
            if (resp.ok) {
                alert('Utilisateur mis à jour avec succès');
                setUser(form); // Met à jour l’utilisateur affiché avec les nouvelles données
            } else {
                alert(`Erreur: ${result.message}`);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async () => {
        if (!confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) return;

        try {
            const resp = await fetch(`http://localhost:3000/api/admin/users/${params.id}`, {
                method: 'DELETE',
            });
            if (resp.ok) {
                alert('Utilisateur supprimé avec succès');
                // Redirection ou mise à jour de l'interface après suppression
                window.location.href = '/dashboard/users'; // Redirige vers la liste des utilisateurs ou une autre page
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
    if (!user) return <div>Utilisateur non trouvé.</div>;

    return (
        <Layout>
            <div className="container mx-auto p-6">
                <h1 className="text-3xl font-bold mb-4">Détails et Modification de l’Utilisateur</h1>
                <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                    <h2 className="text-2xl font-semibold mb-4">{user.username}</h2>
                    <p className="text-gray-700 mb-4">Email: {user.email}</p>
                    <p className="text-gray-700 mb-4">Rôle: {user.role}</p>
                </div>
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 mb-6">
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="username">Nom d’utilisateur</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={form?.username || ''}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={form?.email || ''}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="role">Rôle</label>
                        <select
                            id="role"
                            name="role"
                            value={form?.role || ''}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        >
                            <option value="">Sélectionner un rôle</option>
                            <option value="user">Utilisateur</option>
                            <option value="admin">Administrateur</option>
                        </select>
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
                    Supprimer l’Utilisateur
                </button>
            </div>
        </Layout>
    );
}
