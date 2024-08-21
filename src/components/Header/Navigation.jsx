import React, { useContext, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { Link, NavLink } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

export default function Navigation() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const { user, LogOutHandler } = useContext(UserContext);
  const menuItems = [
    {
      path: "/movies",
      text: "Movies",
    },
    {
      path: "/tvShows",
      text: "Tv",
    },
    {
      path: "/people",
      text: "People",
    },
    {
      path: "/more",
      text: "More",
    },
  ];

  const activeClass = ({ isActive }) => {
    return isActive ? "active" : "hover:text-yellow-500";
  };

  return (
    <>
      <nav className="flex justify-between items-center m-auto bg-slate-800  container sm:bg-transparent ">
        <div className="flex items-center">
          <Link to="/" className="hover:text-yellow-400">
            <h1 className="mr-10 text-2xl">
              Amin
              <span className="hover:text-yellow-500 text-red-600">Movies</span>
              <p className="text-xs text-center font-light text-slate-500">
                Film review
              </p>
            </h1>
          </Link>
          <ul className="hidden md:flex gap-4 text-sm uppercase">
            {menuItems.map((item) => (
              <li key={item.text}>
                <NavLink to={item.path} className={activeClass}>
                  {item.text}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="ml-auto">
          {user.username ? (
            <div className="flex gap-3  items-center">
              <h2>{user.name}</h2>
              <button
                className="px-2 py-1 rounded-xl cursor-pointer bg-red-600"
                onClick={LogOutHandler}
              >
                Log Out
              </button>
            </div>
          ) : (
            <ul className="hidden sm:flex gap-4 uppercase text-sm">
              <li className="hover:text-yellow-500">
                <NavLink to="/login">login</NavLink>
              </li>
              <li>
                <NavLink
                  to="/signup"
                  className="bg-red-600 hover:bg-yellow-500 p-2 rounded-xl"
                >
                  sign up
                </NavLink>
              </li>
            </ul>
          )}
        </div>
        <button
          onClick={() => setIsOpenMenu(!isOpenMenu)}
          aria-label="Toggle menu"
        >
          <AiOutlineMenu className="text-2xl sm:hidden" />
        </button>
      </nav>
      <div
        className={`sm:hidden text-center transition-all duration-200 ${
          isOpenMenu
            ? "max-h-screen py-4 border-t-2 border-t-slate-500 bg-slate-800"
            : "max-h-0 overflow-hidden"
        }`}
      >
        <ul className="flex flex-col gap-4 py-2">
          {menuItems.map((item) => (
            <li key={item.text} className="hover:text-yellow-500">
              <NavLink to={item.path}>{item.text.toUpperCase()}</NavLink>
            </li>
          ))}
        </ul>
        <div className="border-t-2 border-t-slate-500 flex justify-center items-center gap-4 py-2">
          <button>LOGIN</button>
          <button className="bg-red-600 px-3 py-1 rounded-xl">SIGN UP</button>
        </div>
      </div>
    </>
  );
}
