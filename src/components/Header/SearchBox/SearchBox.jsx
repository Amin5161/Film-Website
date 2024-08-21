import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { CiSearch } from "react-icons/ci";
import Tv from "./Items/Tv";
import Movie from "./Items/Movie";
import Person from "./Items/Person";

export default function SearchBox() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const search = useCallback(async () => {
    try {
      if (query.trim() === "") {
        setResults([]); // پاک کردن نتایج قبلی هنگام خالی بودن کوئری
        return;
      }

      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/multi`,
        {
          params: {
            query,
            api_key: "9cc80de4dda05e0a37c69fb4ea529c04",
          },
        }
      );
      console.log(data.results);
      setResults(data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [query]);

  useEffect(() => {
    const timeOutSearch = setTimeout(() => {
      search();
    }, 500);

    return () => clearTimeout(timeOutSearch);
  }, [query, search]);

  function showResult(item) {
    switch (item.media_type) {
      case "tv":
        return <Tv key={item.id}  item={item} />;
      case "movie":
        return <Movie key={item.id}  item={item} />;
      case "person":
        return <Person key={item.id}  item={item} />;
    } 
  }

  return (
    <div className="container mx-auto">
      <div className=" mt-4 mx-auto relative">
        <section className="flex items-center relative">
          <input
            type="text"
            placeholder="Search for a movie"
            className="w-full p-2 border-2 border-slate-900 rounded-sm bg-slate-600 outline-none placeholder:text-sm sm:p-1"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <CiSearch className="absolute right-2 text-2xl" />
        </section>
        <div
          className={`bg-slate-400 text-gray-700 bg-opacity-90  w-full rounded-sm absolute z-10 overflow-auto ${
            results.length ? "max-h-44" : "h-0 overflow-hidden"
          }`}
        >
          

          <div onClick={()=>setResults([])}>{results.map((item) => showResult(item))}</div>
        </div>

        {/* نمایش نتایج جستجو */}
      </div>
    </div>
  );
}
