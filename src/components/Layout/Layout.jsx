import React from "react";
import Header from "../Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";

export default function Layout() {
  return (
    <div >
      <Header />
      <main className="min-h-screen container flex-grow mx-auto p-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

