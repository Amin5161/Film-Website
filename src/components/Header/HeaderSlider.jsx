import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import MovieCard from "../Main/MovieCard";
import { useEffect, useState } from "react";
import axios from "axios";
export default function HeaderSlider({ setHeaderBackground }) {
  const [movies, setMovies] = useState([]);

  const loadMovies = async () => {
    try {
      const { data } = await axios.get(
        "https://api.themoviedb.org/3/movie/popular?api_key=9cc80de4dda05e0a37c69fb4ea529c04"
      );
      setMovies(data.results);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    if (movies.length === 0) {
      loadMovies();
    }
  }, []);
  
  return (
    <div className="mt-4 md:mt-8 mx-auto container">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 2000 }}
        loop
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        }}
      >
        {movies.map((movie) => (
          <SwiperSlide
            onMouseOver={() =>
              setHeaderBackground(
                `https://image.tmdb.org/t/p/w780/${movie.backdrop_path}`
              )
            }
            onMouseLeave={() =>
              setHeaderBackground("/images/DC-wow-experience-MR.jpg")
            }
            className="cursor-pointer "
            key={movie.id}
          >
            <MovieCard
              className="w-full h-auto max-h-screen object-cover "
              alt=""
              movie={movie}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
