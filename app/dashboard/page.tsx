"use client";

import React, { useEffect, useState } from 'react';
import { FaHome, FaFilm, FaCog, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";

export default function Dashboard() {
    const router = useRouter();
    const { data: session, status } = useSession();

    const [stats, setStats] = useState({ films: 0, users: 0, comments: 0 });
    const [recentComments, setRecentComments] = useState([]);
    const [recentUsers, setRecentUsers] = useState([]);

    const menuItems = [
        { name: 'Home', icon: FaHome, path: '/dashboard' },
        { name: 'Users', icon: FaUser, path: '/dashboard/users' },
        { name: 'Films', icon: FaFilm, path: '/dashboard/movies' },
        { name: 'Settings', icon: FaCog, path: '/dashboard/settings' },
        { name: 'Logout', icon: FaSignOutAlt, path: '/logout' },
    ];

    const handleNavigation = (path: string) => {
        router.push(path);
    };

    useEffect(() => {
        if (status === "loading") return; // Attend que la session soit chargée

        if (!session || session?.role !== "admin") {
            router.push('http://localhost:3000'); // Redirige si l'utilisateur n'est pas un admin
        }
    }, [session, status, router]);

    useEffect(() => {
        if (session?.role === "admin") {
            // Fetch statistics
            const fetchStats = async () => {
                try {
                    const response = await fetch('http://localhost:3000/api/admin/stats');
                    const data = await response.json();
                    if (data.success) {
                        setStats(data.data);
                    }
                } catch (error) {
                    console.error('Error fetching stats:', error);
                }
            };

            // Fetch recent comments
            const fetchRecentComments = async () => {
                try {
                    const response = await fetch('http://localhost:3000/api/admin/recent-comments');
                    const data = await response.json();
                    if (data.success) {
                        setRecentComments(data.data);
                    }
                } catch (error) {
                    console.error('Error fetching recent comments:', error);
                }
            };

            // Fetch recent users
            const fetchRecentUsers = async () => {
                try {
                    const response = await fetch('http://localhost:3000/api/admin/recent-users');
                    const data = await response.json();
                    if (data.success) {
                        setRecentUsers(data.data);
                    }
                } catch (error) {
                    console.error('Error fetching recent users:', error);
                }
            };

            fetchStats();
            fetchRecentComments();
            fetchRecentUsers();
        }
    }, [session]);

    if (status === "loading") {
        return <p>Chargement...</p>; // Affiche un indicateur de chargement pendant la vérification de la session
    }

    if (!session || session?.role !== "admin") {
        return null; // Empêche l'affichage du contenu si l'utilisateur n'est pas autorisé
    }

    return (
        <aside className="h-full w-full bg-gray-800 text-white">
            <div className="flex items-center justify-center py-4">
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            </div>
            <nav>
                <ul className="flex space-x-4 px-4">
                    {menuItems.map((item, index) => (
                        <li
                            key={index}
                            className={`flex items-center p-2 text-lg font-medium rounded-md hover:bg-gray-700 cursor-pointer ${
                                router.pathname === item.path ? 'bg-gray-700' : ''
                            }`}
                            onClick={() => handleNavigation(item.path)}
                        >
                            <item.icon className="mr-2" />
                            {item.name}
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="px-4 py-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    {Object.entries(stats).map(([key, value]) => (
                        <div key={key} className="bg-gray-700 p-4 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold mb-2 capitalize">{key}</h2>
                            <p className="text-3xl font-bold">{value}</p>
                        </div>
                    ))}
                </div>
                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-4">Recent Comments and Films</h2>
                    <table className="w-full bg-gray-700 rounded-lg shadow-md">
                        <thead>
                            <tr className="border-b border-gray-600">
                                <th className="p-2 text-left">Comment</th>
                                <th className="p-2 text-left">Film</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentComments.map((item, index) => (
                                <tr key={index} className="border-b border-gray-600">
                                    <td className="p-2">{item.comment}</td>
                                    <td className="p-2">{item.film}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div>
                    <h2 className="text-xl font-semibold mb-4">Nouveaux abonnés</h2>
                    <table className="w-full bg-gray-700 rounded-lg shadow-md">
                        <thead>
                            <tr className="border-b border-gray-600">
                                <th className="p-2 text-left">Name</th>
                                <th className="p-2 text-left">Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentUsers.map((user, index) => (
                                <tr key={index} className="border-b border-gray-600">
                                    <td className="p-2">{user.username}</td>
                                    <td className="p-2">{user.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </aside>
    );
}
