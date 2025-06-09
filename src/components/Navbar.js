import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabase";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data?.session?.user ?? null);
    };
    getUser();
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Logout error", error);
    } else {
      setUser(null);
      navigate("/");
    }
  };

  return (
    <nav className="bg-lightgray text-richblack relative z-50">
      <div className="container mx-auto pt-6 px-4 py-2 flex justify-between items-center">
        {/* Hamburger menu */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-richblack focus:outline-none z-50"
          aria-label="Toggle-menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-tight">
          AB
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex space-x-6">
          <Link
            to="/"
            className="text-richblack hover:bg-darkgray hover:text-lightgray hover:rounded px-4 py-2 font-bold transition"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-richblack hover:bg-darkgray hover:text-lightgray hover:rounded px-4 py-2 font-bold transition"
          >
            About
          </Link>
          <Link
            to="/projects"
            className="text-richblack hover:bg-darkgray hover:text-lightgray hover:rounded px-4 py-2 font-bold transition"
          >
            Projects
          </Link>
          <Link
            to="/contact"
            className="text-richblack hover:bg-darkgray hover:text-lightgray hover:rounded px-4 py-2 font-bold transition"
          >
            Contact
          </Link>
        </div>

        {/* Desktop Auth */}
        <div className="hidden lg:flex space-x-4 items-center">
          {!user ? (
            <Link
              to="/login"
              className="bg-verydarkgray rounded text-white hover:bg-darkgray hover:text-lightgray hover:rounded py-1 px-4 transition"
            >
              Log In
            </Link>
          ) : (
            <>
              <Link
                to="/dashboard"
                className="bg-verydarkgray rounded text-white hover:bg-darkgray hover:text-lightgray hover:rounded py-1 px-4 transition"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="bg-verydarkgray rounded text-white hover:bg-darkgray hover:text-lightgray hover:rounded py-1 px-4 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-mediumgray transform transition-transform duration-300 ease-in-out z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="px-6 pt-12 space-y-2">
          <Link
            to="/"
            className="block text-richblack hover:bg-darkgray hover:text-lightgray hover:rounded px-4 py-2 font-bold transition"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="block text-richblack hover:bg-darkgray hover:text-lightgray hover:rounded px-4 py-2 font-bold transition"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          <Link
            to="/projects"
            className="block text-richblack hover:bg-darkgray hover:text-lightgray hover:rounded px-4 py-2 font-bold transition"
            onClick={() => setIsOpen(false)}
          >
            Projects
          </Link>
          <Link
            to="/contact"
            className="block text-richblack hover:bg-darkgray hover:text-lightgray hover:rounded px-4 py-2 font-bold transition"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>

          {!user ? (
            <Link
              to="/login"
              className="block text-richblack font-bold hover:text-lightgray hover:rounded py-1 px-4 transition"
              onClick={() => setIsOpen(false)}
            >
              Log In
            </Link>
          ) : (
            <>
              <Link
                to="/dashboard"
                className="block text-richblack font-bold hover:text-lightgray hover:rounded py-1 px-4 transition"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="block text-richblack font-bold hover:text-lightgray hover:rounded py-1 px-4 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-30 z-30"
        />
      )}
    </nav>
  );
}
