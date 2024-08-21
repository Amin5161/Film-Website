import axios from "axios";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import MovieCard from "./MovieCard";

export default function MoviesListSlider({ type, activeTab }) {
  const [movies, setMovies] = useState([]); // مقداردهی اولیه به movies به عنوان یک آرایه خالی
  const [error, setError] = useState(null); // برای مدیریت خطاها

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/${type}/${activeTab}`,
          {
            params: {
              api_key: "9cc80de4dda05e0a37c69fb4ea529c04",
              language: 'en-US',
            },
          }
        );

        // چاپ پاسخ کامل برای بررسی
        console.log("API Response:", response);

        if (response.data && response.data.results) {
          console.log(response.data.results)
          setMovies(response.data.results);
        } else {
          setMovies([]); // تنظیم به آرایه خالی اگر داده‌ها وجود ندارند
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
        setError(error); // تنظیم خطا
        setMovies([]); // تنظیم به آرایه خالی در صورت بروز خطا
      }
    })();
  }, [type, activeTab]);

  return (
    <div>
      {error && <p>Error fetching movies. Please try again later.</p>} {/* نمایش خطا در صورت بروز */}
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 4000 }}
        loop
        freeMode={true}
        breakpoints={{
          640: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
        }}
      >
        {movies.length > 0 ? (
          movies.map((movie) => (
            <SwiperSlide className="cursor-pointer" key={movie.id}>
              <MovieCard
              movie={movie}
              />
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <p>No movies found.</p>
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  );
}
