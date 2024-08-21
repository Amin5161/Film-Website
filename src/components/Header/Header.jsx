import React from "react";
import Navigation from "./Navigation";
import SearchBox from "./SearchBox/SearchBox";
import FollowUs from "./FollowUs";
import HeaderSlider from "./HeaderSlider";
import { useState } from "react";
import { useLocation } from "react-router-dom";
export default function Header() {
  const [headerBackground, setHeaderBackground] = useState(
    "/images/DC-wow-experience-MR.jpg"
  );

  const location = useLocation();
  return (
    <header
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url(${headerBackground}) `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "background-img .3s ease",
      }}
      className="m-auto"
    >
      <div className=" sm:pt-4 pb-3 ">
        <Navigation />
        <SearchBox />
        {location.pathname === "/" && (
          <>
            <FollowUs />
            <HeaderSlider setHeaderBackground={setHeaderBackground} />
          </>
        )}
      </div>
    </header>
  );
}
