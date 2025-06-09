import React from "react";
import { Link } from "react-router-dom";
import { FaLinkedin, FaGithub, FaCode } from "react-icons/fa";

const HeroSection = () => {
  return (
    <section className="bg-lightgray py-20  px-6 lg:px-20 flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
      {/* LEFT SIDE */}
      <div className="max-w-xl w-full">
        <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-richblack">
          Bringing Ideas <br /> to Life with Code
        </h1>

        <p className="text-mutedgray text-lg mb-8">
          I build fast, scalable, and user-focused web applications — from front
          to back.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
          <a
            href="/resume.pdf"
            download
            className="bg-verydarkgray text-white px-6 py-3 rounded shadow hover:bg-darkgray hover:text-lightgray transition"
          >
            Download Resume
          </a>

          <Link
            to="/projects"
            className="text-gray-700 font-semibold hover:text-black transition"
          >
            Latest Projects
          </Link>
        </div>

        {/* External Profiles */}
        <div className="flex gap-6 items-center mb-8 text-2xl text-richblack">
          {/* Using Link for external URLs will not open in new tab and may break */}
          <Link
            to="https://www.linkedin.com/in/abrar-hossain-90096136a"
            target="_blank"
            className="hover:text-blue-800 transition"
            title="LinkedIn"
          >
            <FaLinkedin />
          </Link>
          <Link
            to="https://github.com/Tiger-12-Ab"
            target="_blank"
            className="hover:text-darkgray transition"
            title="GitHub"
          >
            <FaGithub />
          </Link>
          <Link
            to="https://leetcode.com/yourusername"
            target="_blank"
            className="hover:text-yellow-600 transition"
            title="LeetCode"
          >
            <FaCode />
          </Link>
        </div>

        {/* Stats */}
        <div className="flex flex-col sm:flex-row gap-8 text-center">
          <div>
            <h2 className="text-2xl font-bold text-richblack">1+ Years</h2>
            <p className="text-sm text-darkgray">Experience</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-richblack">Practical</h2>
            <p className="text-sm text-darkgray">Hands-on Experience</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-richblack">100%</h2>
            <p className="text-sm text-darkgray">Commitment</p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="relative w-[280px] sm:w-[320px] md:w-[400px]">
        <img
          src="/portfolio.jpg"
          alt="Your profile"
          className="rounded-xl w-full"
        />

        {/* Floating Skill Tags */}
        <div className="absolute top-6 left-[-30px] bg-white px-4 py-2 rounded shadow text-sm font-medium border border-black/20">
          Frontend
        </div>
        <div className="absolute bottom-8 left-[-30px] bg-white px-4 py-2 rounded shadow text-sm font-medium border border-black/20">
          API Integration
        </div>
        <div className="absolute top-1/2 right-[-18px] bg-white px-4 py-2 rounded shadow text-sm font-medium border border-black/20">
          Backend
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
