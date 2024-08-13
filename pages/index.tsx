import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
  const [data, setData] = useState([]);
  const [filtre, setFiltre] = useState([]);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");
  const [releaseDate, setReleaseDate] = useState("");

  useEffect(() => {
    const fetchAll = async () => {
      const reponse = await fetch("/api/films");

      if (reponse.ok) {
        const data = await reponse.json();
        setData(data);
        setFiltre(data);
      } else {
        alert("Impossible de charger les données !");
      }
    };
    fetchAll();
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    filtreFilms(e.target.value, genre, releaseDate);
  };

  const handleGenreChange = (e) => {
    setGenre(e.target.value);
    filtreFilms(search, e.target.value, releaseDate);
  };

  const handleReleaseDateChange = (e) => {
    setReleaseDate(e.target.value);
    filtreFilms(search, genre, e.target.value);
  };

  const filtreFilms = (searchF, genre, releaseDate) => {
    let filtrage = data;

    if (searchF) {
      filtrage = filtrage.filter((film) =>
        film.title.toLowerCase().includes(searchF.toLowerCase())
      );
    }

    if (genre) {
      filtrage = filtrage.filter((film) =>
        film.genre[0].toLowerCase().includes(genre.toLowerCase())
      );
    }

    if (releaseDate) {
      filtrage = filtrage.filter(
        (film) =>
          new Date(film.release_date).getFullYear() === parseInt(releaseDate)
      );
    }
    console.log(filtrage);

    setFiltre(filtrage);
  };

  return (
    <>
      <nav id="header" className="w-full z-30 top-0 py-1">
        <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-6 py-3">
          <label
            htmlFor="menu-toggle"
            className="cursor-pointer md:hidden block"
          >
            <svg
              className="fill-current text-gray-900"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
            >
              <title>menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
            </svg>
          </label>
          <input className="hidden" type="checkbox" id="menu-toggle" />

          <div
            className="hidden md:flex md:items-center md:w-auto w-full order-3 md:order-1"
            id="menu"
          >
            <nav>
              <ul className="md:flex items-center justify-between text-base text-gray-700 pt-4 md:pt-0">
                <li>
                  <a
                    className="inline-block no-underline text-blue-500 text-2xl hover:text-blue-800 py-2 px-4"
                    href="#"
                  >
                    Movies
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <div className="order-1 md:order-2">
            <div className="relative">
              <input
                placeholder="Search movies..."
                className="input shadow-lg focus:border-2 border-gray-300 px-5 py-3 rounded-xl w-56 transition-all focus:w-64 outline-none"
                value={search}
                type="text"
                onChange={handleSearchChange}
              />
              {/* <button type="submit">search</button> */}
            </div>
          </div>

          <div
            className="order-2 md:order-3 flex items-center"
            id="nav-content"
          >
            <Link
              className="inline-block no-underline hover:text-black"
              href={"/userProfil"}
            >
              <svg
                className="fill-current hover:text-black"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <circle fill="none" cx="12" cy="7" r="3" />
                <path d="M12 2C9.243 2 7 4.243 7 7s2.243 5 5 5 5-2.243 5-5S14.757 2 12 2zM12 10c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3S13.654 10 12 10zM21 21v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h2v-1c0-2.757 2.243-5 5-5h4c2.757 0 5 2.243 5 5v1H21z" />
              </svg>
            </Link>
          </div>
        </div>
      </nav>

      <div className="flex justify-center items-center">
        <div>
          <img
            className="h-auto max-w-full rounded-lg"
            src="https://media.gqmagazine.fr/photos/608297ace24bc2c55a7e1c2f/16:9/w_1280,c_limit/plus%20belles%20affiches%20cinéma.png"
            alt=""
          />
        </div>
      </div>

      <div className="flex justify-center mt-10 gap-14">

        <h1>Filtrer par Genre et Année</h1>

        <div className="">
        <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" value={genre} onChange={handleGenreChange}>
          <option value="">All Genres</option>
          <option value="Action">ACTION</option>
          <option value="Comédie">COMÉDIE</option>
          <option value="Thriller">THRILLER</option>
          <option value="Crime">CRIME</option>
          <option value="Animation">Animation</option>
          <option value="Familial">Familial</option>
          <option value="Fantastique">Fantastique</option>
          <option value="Aventure">Aventure</option>
          <option value="Drame">Drame</option>
          <option value="Horreur">Horreur</option>
          <option value="Science-Fiction">Science-Fiction</option>
        </select>
        </div>

      <div>
      <select
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          value={releaseDate}
          onChange={handleReleaseDateChange}
        >
          <option value="">All Years</option>
          <option value="2020">2020</option>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
        </select>
      </div>

      </div>
      <section className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
        {filtre.map((item) => (
          // <!--   ✅ Product card 1 - Starts Here 👇 -->
          <div
            key={item._id}
            className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
          >
            <Link href={`/movies/${item._id}`}>
              <img
                src={item.image || "https://images.pexels.com/photos/918281/pexels-photo-918281.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"} 
                alt="🎬 ..."
                className="h-80 w-72 object-cover rounded-t-xl"
              />
              <div className="px-4 py-3 w-72">
                <span className="text-gray-400 mr-3 uppercase text-xs">
                  {item.genre[0]} {item.release_date}
                </span>
                <p className="text-lg font-bold text-black truncate block capitalize">
                  {item.title}
                </p>
                <div className="flex items-center">
                  <p className="text-lg font-semibold text-black cursor-auto my-3">
                    {item.average_rating}
                  </p>
                  <div className="ml-auto">
                    {/* <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-bag-plus"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"
                      />
                      <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                    </svg> */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-bag-plus"
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8l0-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5l0 3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20-.1-.1s0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5l0 3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2l0-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
        {/* <!--   🛑 Product card 1 - Ends Here  --> */}
      </section>
    </>
  );
}
