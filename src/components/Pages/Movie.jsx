import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MdFavorite } from "react-icons/md";
import { IoMdShare } from "react-icons/io";
import { UserContext } from "../Context/UserContext";
import { Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { FaStar } from "react-icons/fa";
import toast from "react-hot-toast";

export default function Movie() {
  const [movie, setMovie] = useState(null);
  const { id } = useParams();
  const { favoriteMovies, toggleFavorite, isMovieFavorite } =
    useContext(UserContext);
  const [value, setValue] = useState(2);
  const [hover, setHover] = useState(-1);

  useEffect(() => {
    const loadMovie = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=9cc80de4dda05e0a37c69fb4ea529c04`
      );
      setMovie(data);
    };
    loadMovie();
  }, [id]);

  const isFavorite = isMovieFavorite(Number(id));

  function handleFavoriteClick() {
    toggleFavorite(Number(id));
  }

  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5Y2M4MGRlNGRkYTA1ZTBhMzdjNjlmYjRlYTUyOWMwNCIsIm5iZiI6MTcyNDIyNTM2MS4xMzUxMzksInN1YiI6IjY2Yjc3MDgwMjk3ODVlY2VlYTU5NjUxYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.g-fhYVRyfDLS2WwhgbDnkRE4fkz0D1aF5Ub5VOlxgL8'
    }
  };
  async function changeRate(rate) {
    await axios.post(
      `https://api.themoviedb.org/3/movie/${movie.id}/rating?api_key=9cc80de4dda05e0a37c69fb4ea529c04`,
      { value: rate },
      options
    );
    toast.success('Your Vote Is Submitted')
  }

  return (
    <>
      {movie ? (
        <div className="container grid grid-cols-4 gap-10">
          <div className="col-span-1">
            <img
              src={`https://image.tmdb.org/t/p/w780/${movie.poster_path}`}
              alt={movie.title}
            />
          </div>
          <div className="col-span-3">
            <div className="flex items-center gap-2">
              <h1 className="text-3xl">{movie.title}</h1>
              <time className="opacity-15">
                {movie.release_date.split("-")[0]}
              </time>
            </div>
            <div className="flex gap-8 mt-6">
              <button
                className="flex gap-2 items-center"
                onClick={handleFavoriteClick}
              >
                <div className=" border-2 border-red-600 w-6 h-6 rounded-full flex items-center justify-center">
                  <MdFavorite
                    className={`text-sm ${
                      isFavorite ? "text-red-600" : "text-white"
                    } `}
                  />
                </div>
                <p className="text-red-600 text-sm ">
                  {!isFavorite ? "REMOVE FROM FAVORITES" : "ADD TO FAVORITES"}
                </p>
              </button>
              <button className="flex gap-2 items-center">
                <div className=" border-2 border-red-600 w-6 h-6 rounded-full flex items-center justify-center">
                  <IoMdShare className="text-red-600 text-sm" />
                </div>
                <p className="text-red-600 text-sm">SHARE</p>
              </button>
            </div>
            <div className=" grid mt-8 grid-cols-4 border-t-2 border-b-2 border-gray-600 ">
              <div className="col-span-1 flex p-2 gap-2 items-center">
                <FaStar className="text-yellow-500 w-1/4" />
                <div className="text-xs y-70">
                  <p className="opacity-100 text-white">
                    {parseInt(movie.vote_average)} / 10
                  </p>
                  <p className="opacity-70">{movie.vote_count} reviews</p>
                </div>
              </div>
              <div className="col-span-3 border-l-2 border-gray-600 flex p-2 gap-4 items-center opacity-80">
                <p>Rate This Movie: </p>
                <Rating
                  name="hover-feedback"
                  value={value}
                  precision={0.5}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                    changeRate(newValue);
                  }}
                  onChangeActive={(event, newHover) => {
                    setHover(newHover);
                  }}
                  emptyIcon={
                    <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                  }
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
