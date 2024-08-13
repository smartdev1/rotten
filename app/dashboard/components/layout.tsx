import React from 'react';
import { FaHome, FaFilm, FaCog, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function Layout({ children }) {
    const router = useRouter();

    const menuItems = [
        { name: 'Home', icon: FaHome, path: '/dashboard' },
        { name: 'Users', icon: FaUser, path: '/dashboard/users' },
        { name: 'Films', icon: FaFilm, path: '/dashboard/movies' },
        { name: 'TMDB', icon: FaFilm, path: '/dashboard/tmdb' },
        { name: 'Settings', icon: FaCog, path: '/dashboard/settings' },
        { name: 'Logout', icon: FaSignOutAlt, path: '/logout' },
    ];

    const handleNavigation = (path) => {
        router.push(path);
    };

    return (
        <div className="flex h-screen">
            <aside className="w-1/4 bg-gray-800 text-white">
                <div className="flex items-center justify-center py-4">
                    <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                </div>
                <nav>
                    <ul className="flex flex-col space-y-2 px-4 py-4">
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
            </aside>
            <main className="flex-1 p-6 bg-gray-100">
                {children}
            </main>
        </div>
    );
}
