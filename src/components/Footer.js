import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-darkgray text-mutedgray">
      <div className=" pt-8 pb-0 px-6 md:px-20 flex flex-col">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">

        {/* Left: Secondary Logo */}
        <div className="text-2xl font-bold text-white">
          AB
        </div>

        {/* Middle: Navigation Links */}
<div className="flex flex-col items-center space-y-4 w-full">
  {/* Centered Nav Links */}
  <div className="w-full flex justify-center space-x-6 text-sm md:text-base">
    <Link to="/" className="font-semibold text-mediumgray hover:text-mutedgray transition">Home</Link>
    <Link to="/projects" className="font-semibold text-mediumgray hover:text-mutedgray transition">Projects</Link>
    <Link to="/contact" className="font-semibold text-mediumgray hover:text-mutedgray transition">Contact</Link>
  </div>

  {/* Contact Info (still centered on all screens) */}
  <div className="flex flex-col lg:flex-row lg:space-x-6 text-sm text-mutedgray text-center lg:text-left">
    <span>Email: tiger.12.ht@gmail.com</span>
    <span>Phone: +880 1560-005502</span>
  </div>
</div>

        {/* Right: Social Icons */}
        <div className="flex space-x-4 text-3xl">
          <a href="https://github.com/Tiger-12-Ab" target="_blank" rel="noopener noreferrer" className="text-richblack hover:text-mutedgray">
            <FaGithub />
          </a>
          <a href="https://www.linkedin.com/in/abrar-hossain-90096136a" target="_blank" rel="noopener noreferrer" className="text-richblack hover:text-blue-800">
            <FaLinkedin />
          </a>
          
        </div>

      </div>
    </div>
      {/* Bottom Copyright */}
      <div className="mt-8 text-center text-sm text-mutedgray bg-verydarkgray w-full">
        © {new Date().getFullYear()} Abrar Hossain. All rights reserved.
      </div>
      
    </footer>
  );
}
