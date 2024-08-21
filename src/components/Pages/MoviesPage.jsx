import react, { useState } from "react";
import MoviesListSlider from "../Main/MoviesListSlider";

export default function MoviesPage() {

  const [moviesActiveTab, setMoviesActiveTab] = useState('popular');
  const [tvsActiveTab, setTvsActiveTab] = useState('popular');
  
  function handleChangeMovieActiveTab(tab){
    setMoviesActiveTab(tab);
  }

  function handleChangeTvActiveTab(tab){
    setTvsActiveTab(tab);
  }

  function activeClass(tab){
    return tab === moviesActiveTab ? 'text-yellow-300' : '';
  }

  function activeTvClass(tab){
    return tab === tvsActiveTab ? 'text-yellow-300' : '';
  }

  return (
    <>
      <div className="container m-auto mt-8">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-8">
          <h3 className="text-2xl">Whats Popular</h3>
          <ul className="sm:flex sm:gap-8 items-center">
            <li onClick={() => handleChangeMovieActiveTab('upcoming')} className={`w-fit cursor-pointer ${activeClass('upcoming')}`}>Upcoming</li>
            <li onClick={() => handleChangeMovieActiveTab('now_playing')} className={`w-fit cursor-pointer ${activeClass('now_playing')}`}>Now Playing</li>
            <li onClick={() => handleChangeMovieActiveTab('popular')} className={`w-fit cursor-pointer ${activeClass('popular')}`}>Popular</li>
            <li onClick={() => handleChangeMovieActiveTab('top_rated')} className={`w-fit cursor-pointer ${activeClass('top_rated')}`}>Top Rated</li>
          </ul>
        </div>
        <MoviesListSlider type='movie' activeTab={moviesActiveTab}/>
      </div>
      <div className="container m-auto mt-8 mb-20">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-8">
          <h3 className="text-2xl">Tv-Series</h3>
          <ul className=" sm:flex sm:gap-8">
            <li onClick={() => handleChangeTvActiveTab('airing_today')}  className={`w-fit cursor-pointer ${activeTvClass('airing_today')}`}>Airing-Today</li>
            <li onClick={() => handleChangeTvActiveTab('on_the_air')} className={`w-fit cursor-pointer ${activeTvClass('on_the_air')}`}>On The Air</li>
            <li onClick={() => handleChangeTvActiveTab('popular')} className={`w-fit cursor-pointer ${activeTvClass('popular')}`}>Popular</li>
            <li onClick={() => handleChangeTvActiveTab('top_rated')} className={`w-fit cursor-pointer ${activeTvClass('top_rated')}`}>Top-Rated</li>
          </ul>
        </div>
        <MoviesListSlider type='tv' activeTab={tvsActiveTab}/>
      </div>
    </>
  );
}
