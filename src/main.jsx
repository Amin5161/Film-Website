import React from "react";
import ReactDOM from "react-dom/client";
import "swiper/css";
import "./index.css";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import TvShows from "./components/Pages/TvShowsPage.jsx";
import People from "./components/Pages/People.jsx";
import More from "./components/Pages/More.jsx";
import MoviesPage from "./components/Pages/MoviesPage.jsx";

import Movie from "./components/Pages/Movie.jsx";
import { UserProvider } from "./components/Context/UserContext.jsx";
import Layout from "./components/Layout/Layout.jsx";
import Login from "./components/Pages/Login.jsx";
import { Toaster } from "react-hot-toast";
import ProfilePage from "./components/Pages/ProfilePage.jsx";
import Home from "./components/Pages/Home.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <UserProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="movies" element={<MoviesPage />} />
          <Route path="/tvShows" element={<TvShows />} />
          <Route path="/people" element={<People />} />
          <Route path="/more" element={<More />} />
          <Route path="/movies/:id" element={<Movie />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<ProfilePage />}></Route>
        </Route>
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </UserProvider>
  </BrowserRouter>
);
