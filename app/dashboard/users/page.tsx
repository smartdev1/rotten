"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Layout from "../components/layout";

type User = {
  _id: number;
  username: string;
  email: string;
  role: string;
};

const fetchPageData = async (): Promise<User[]> => {
  const res = await fetch(`http://localhost:3000/api/admin/users`);
  const data = await res.json();
  return data.data;
};

export default function UsersTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPageData();
        setUsers(data);
        setTotalPages(Math.ceil(data.length / 10));
      } catch (error) {
        console.log('Erreur lors de la récupération des utilisateurs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const currentUsers = () => {
    const startIndex = (currentPage - 1) * 10;
    const endIndex = startIndex + 10;
    return users.slice(startIndex, endIndex);
  };

  if (loading) return <div>Chargement des informations...</div>;

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Utilisateurs</h1>
          <Link href="/dashboard/users/news">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
              Nouvel utilisateur
            </button>
          </Link>
        </div>
        <table className="w-full bg-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="border-b border-gray-600">
              <th className="p-2 text-left">Username</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Role</th>
              <th colSpan={2}></th>
            </tr>
          </thead>
          <tbody>
            {currentUsers().map((user) => (
              <tr key={user._id} className="border-b border-gray-600">
                <td className="p-2">
                  <Link href={`/dashboard/users/${user._id}`}>
                    {user.username}
                  </Link>
                </td>
                <td className="p-2">
                  <Link href={`/dashboard/users/${user._id}`}>
                    {user.email}
                  </Link>
                </td>
                <td className="p-2">
                  <Link href={`/dashboard/users/${user._id}`}>
                    {user.role}
                  </Link>
                </td>
                <td className="p-2">
                  <Link href={`/dashboard/users/${user._id}`}>
                    Modifier
                  </Link>
                </td>
                <td className="p-2">
                  <Link href={`/dashboard/users/${user._id}`}>
                    Supprimer
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination mt-4 flex justify-center">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`pagination-btn px-4 py-2 rounded-lg mx-1 ${currentPage === index + 1 ? 'bg-gray-600 text-white' : 'bg-gray-300 text-gray-800'} hover:bg-gray-700 transition`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </Layout>
  );
}
