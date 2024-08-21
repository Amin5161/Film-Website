import React from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
  return (
    <Link to={`/movies/${movie.id}`}>
      <div className="bg-slate-500 aspect-[2/3] relative rounded overflow-hidden">
        {/* تصویر */}
        <img className="w-full h-full object-cover" src={`https://image.tmdb.org/t/p/w780/${movie.poster_path}`} alt="Die Hard" />

        <div className="absolute inset-0 bg-gradient-to-t    from-[#0f172ab4] to-[#0f172a00]"></div>

        <div className="absolute bottom-0 left-0 p-4 text-white">
          <h3 className="text-sm font-bold">{movie.title}</h3>
          <div className="flex items-center gap-2 mt-1">
            <FaStar className="text-yellow-400" />
            <span className="text-sm">{movie.vote_average}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
