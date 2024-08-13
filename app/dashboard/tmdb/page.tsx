"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Layout from "../components/layout";

type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
};

type MoviesResponse = {
  results: Movie[];
};

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NjVmM2E4NDVmMjVmNjRhM2ZjYzkxNjIwMTZmM2E1NiIsIm5iZiI6MTcyMjkzOTYyNi44MzY2MjcsInN1YiI6IjY2YWExYzk3MDJiOGY2MWU2OTE5NDdkNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6IOKeqC-OtCiHxzrraXu0yPZ4upKmBgz5fs7-BRpem4",
  },
};

const fetchPageData = async (page: number): Promise<Movie[]> => {
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=fr-FR&page=${page}&sort_by=popularity.desc`,
    options
  );
  const data: MoviesResponse = await res.json();
  return data.results;
};

const fetchMovies = async (): Promise<Movie[]> => {
  let allMovies: Movie[] = [];
  const totalPages = 5;

  for (let page = 1; page <= totalPages; page++) {
    const movies = await fetchPageData(page);
    allMovies = [...allMovies, ...movies];
  }

  return allMovies;
};

export default function MoviesTable() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchMovies();
      setMovies(data);
    };
    fetchData();
  }, []);

  // Mise en place d'un système de pagination
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  const totalPages = Math.ceil(movies.length / moviesPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Films de la base de données</h1>
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="p-4">Poster</th>
              <th className="p-4">Title</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {currentMovies.map((movie) => (
              <tr key={movie.id} className="border-b border-gray-300">
                <td className="p-4">
                  <img
                    src={`https://media.themoviedb.org/t/p/w220_and_h330_face/${movie.poster_path}`}
                    alt={movie.title}
                    className="w-24 h-36 object-cover rounded"
                  />
                </td>
                <td className="p-4">
                  <Link href={`/dashboard/tmdb/${movie.id}`} className="text-blue-600 hover:underline">
                    {movie.title}
                  </Link>
                </td>
                <td className="p-4">
                  <Link href={`/dashboard/tmdb/${movie.id}`} className="text-blue-600 hover:underline">
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
              className="pagination-btn px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </Layout>
  );
}
