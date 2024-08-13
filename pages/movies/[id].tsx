"use client";
import { useEffect, useState } from "react";
import React from "react";
import { useRouter } from "next/router";

const detail = () => {
  const [movie, setMovie] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  // console.log(id);
  const [comment, setComment] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [note, setNote] = useState(0);

  useEffect(() => {
    if (id) {
      const fetchOne = async () => {
        const reponse = await fetch(`/api/film/${id}`);
        const data = await reponse.json();
        setMovie(data);
      };

      const fetchComment = async () => {
        const res = await fetch(`/api/comments?movie_id=${id}`);
        const data = await res.json();
        setComment(Array.isArray(data.comments) ? data.comments : []);
        // setComment(data)
        console.log(data.comments);
      };

      fetchComment();
      fetchOne();
    }
  }, [id]);

  const handleSelectChange = async (e) => {
    const selectNote = Number(e.target.value);
    setNote(selectNote);

    try {
      const res = await fetch(`/api/films/?id=${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rating: selectNote,
        }),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setNewComment(e.target.value);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!newComment) return;

    const res = await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        movie_id: id,
        user_id: "59b99dbbcfa9a34dcd7885c4",
        comment: newComment,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      setComment([...comment, data]);
      setNewComment("");
    } else {
      console.error("Failed to add comment");
    }
  };

  if (!movie)
    return (
      <div>
        <div className="flex flex-col bg-neutral-300 w-56 h-64 animate-pulse rounded-xl p-4 gap-4">
          <div className="bg-neutral-400/50 w-full h-32 animate-pulse rounded-md"></div>
          <div className="flex flex-col gap-2">
            <div className="bg-neutral-400/50 w-full h-4 animate-pulse rounded-md"></div>
            <div className="bg-neutral-400/50 w-4/5 h-4 animate-pulse rounded-md"></div>
            <div className="bg-neutral-400/50 w-full h-4 animate-pulse rounded-md"></div>
            <div className="bg-neutral-400/50 w-2/4 h-4 animate-pulse rounded-md"></div>
          </div>
        </div>
      </div>
    );

  return (
    <div className="mt-10">
      <section className="text-gray-700 body-font overflow-hidden bg-white">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
              src={
                movie.image ||
                "https://www.whitmorerarebooks.com/pictures/medium/2465.jpg"
              }
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                {movie.genre}
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {movie.title}
              </h1>
              <div className="flex mb-4"></div>
              <p className="leading-relaxed">{movie.description}</p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                <div className="flex ml-6 items-center">
                  <div className="relative">
                    <select className="rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-blue-500 text-base pl-3 pr-10">
                      <option value="0">Noter</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">
                  {movie.average_rating}
                </span>
                <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                  <svg
                    fill="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button>

                <div className="w-72">
                  <form
                    onSubmit={handleSubmit}
                    className="p-3 bg-gray-200 rounded-md"
                  >
                    <textarea
                      className="block text-sm rounded-md focus:border-blue-400 focus:ring-blue-400 min-h-[40px] placeholder:italic placeholder:text-slate-400  bg-white w-full border border-slate-300 py-2 pl-9 pr-3 shadow-sm focus:outline-none  focus:ring-1 sm:text-sm"
                      placeholder="Commenter..."
                      value={newComment}
                      onChange={handleChange}
                    ></textarea>
                    <div className="mt-2 space-x-2">
                      <button
                        type="submit"
                        className="px-4 py-2 text-sm font-medium text-white bg-rose-600 hover:bg-rose-500 rounded-md shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 focus:outline-none"
                      >
                        Ajouter
                      </button>
                    </div>
                  </form> 
                  <span className=" mt-8 text-gray-200 text-base">Commentaires</span>
                  {comment.map((item: any) => (
                  <div className="mt-8 mb-5 w-60 bg-gradient-to-l from-slate-300 to-slate-100 text-slate-600 border border-slate-300 grid grid-col-2 justify-center p-4 gap-4 rounded-lg shadow-md">
                    
                    <div className="col-span-2 text-lg font-bold capitalize rounded-md" key={item._id}>
                      {item.comment}
                    </div>
                    

                    <div className="col-span-2 rounded-md"></div>
                    <div className="col-span-1"></div>
                  </div>))}
                </div> 
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <h2>Commentaires</h2>
      <ul>
        {comment.map((item: any) => (
          <li key={item._id}>{item.comment}</li>
        ))}
      </ul> */}
    </div>
  );
};

export default detail;
