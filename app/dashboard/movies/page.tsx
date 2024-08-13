"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Layout from "../components/layout";

type Movie = {
  _id: number;
  title: string;
  overview: string;
  poster_path: string;
};

const fetchPageData = async (): Promise<Movie[]> => {
  const res = await fetch(`http://localhost:3000/api/admin/movies`);
  const data = await res.json();
  return data.data;
};

export default function MoviesTable() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const movieData = await fetchPageData();
        setMovies(movieData);
        setTotalPages(Math.ceil(movieData.length / 10));
      } catch (error) {
        console.error("Erreur lors de la récupération des films:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const currentMovies = () => {
    const startIndex = (currentPage - 1) * 10;
    const endIndex = startIndex + 10;
    return movies.slice(startIndex, endIndex);
  };

  if (loading) return <div>Chargement...</div>;

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="p-4">Poster</th>
              <th className="p-4">Title</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {currentMovies().map((movie) => (
              <tr key={movie._id} className="border-b border-gray-300">
                <td className="p-4">
                  <img
                    src={`https://media.themoviedb.org/t/p/w220_and_h330_face/${movie.image}`}
                    alt={movie.title}
                    className="w-24 h-36 object-cover rounded"
                  />
                </td>
                <td className="p-4">
                  <Link href={`/dashboard/movies/${movie._id}`} className="text-blue-600 hover:underline">
                    {movie.title}
                  </Link>
                </td>
                <td className="p-4">
                  <Link href={`/dashboard/movies/${movie._id}`} className="text-blue-600 hover:underline">
                    Voir les détails
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination mt-4 flex justify-center space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`pagination-btn px-4 py-2 rounded-lg ${currentPage === index + 1 ? 'bg-gray-800 text-white' : 'bg-gray-300 text-gray-800'} hover:bg-gray-700 transition`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </Layout>
  );
}
