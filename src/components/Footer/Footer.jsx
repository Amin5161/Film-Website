import React from "react";

export default function Footer() {
  return (
    <footer className=" text-white py-6 text-center bg-slate-800 w-full z-10 ">
      <div className="container mx-auto flex justify-between items-center px-4">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Your Company Name. All rights
          reserved.
        </p>
        <nav>
          <ul className="flex gap-4 text-sm">
            <li>
              <a href="/privacy" className="hover:text-yellow-500">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/terms" className="hover:text-yellow-500">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-yellow-500">
                Contact Us
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
