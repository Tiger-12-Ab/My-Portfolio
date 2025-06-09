import React from "react";
import { Link } from "react-router-dom";
import { FaLinkedin, FaGithub, FaCode } from "react-icons/fa";
import ContactSection from "../components/ContactSection";

const About = () => {
  return (
    <>
      {/* MAIN ABOUT SECTION */}
      <section className="bg-lightgray py-20 px-6 lg:px-20 flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
        {/* LEFT SIDE */}
        <div className="max-w-xl w-full">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-richblack">
            Who Am I?
          </h1>

          <p className="text-mutedgray text-lg mb-8">
            Bringing innovative concepts to life through practical, real-world
            solutions designed to create lasting value and meaningful impact
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
            <a
              href="https://www.linkedin.com/in/abrar-hossain-90096136a"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-800 transition"
              title="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://github.com/Tiger-12-Ab"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-darkgray transition"
              title="GitHub"
            >
              <FaGithub />
            </a>
            <a
              href="https://leetcode.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-600 transition"
              title="LeetCode"
            >
              <FaCode />
            </a>
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
            alt="My profile photo"
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

      {/* EXTENDED BIO SECTION */}
      <section className="bg-lightgray py-20 px-6 lg:px-20 text-richblack">
        <div className="max-w-6xl mx-auto flex flex-col-reverse lg:flex-row gap-16 mb-18">
          {/* Identity Schema (Left on lg, Bottom on sm) */}
          <div className="lg:w-1/2">
            <h3 className="text-2xl font-semibold mb-6">Identity Schema</h3>
            <ul className="border-l-4 border-verydarkgray pl-6 space-y-6 text-darkgray">
              <li>
                <div className="text-md">
                  <strong className="text-richblack">Name:</strong> Abrar
                  Hossain
                </div>
              </li>
              <li>
                <div className="text-md">
                  <strong className="text-richblack">Email:</strong>{" "}
                  tiger.12.ht@gmail.com
                </div>
              </li>
              <li>
                <div className="text-md">
                  <strong className="text-richblack">Phone:</strong>{" "}
                  +8801560005502
                </div>
              </li>
              <li>
                <div className="text-md">
                  <strong className="text-richblack">Address:</strong> Dhaka,
                  Bangladesh
                </div>
              </li>
              <li>
                <div className="text-md">
                  <strong className="text-richblack">Degree:</strong> Current
                  Student
                </div>
              </li>
              <li>
                <div className="text-md">
                  <strong className="text-richblack">Freelance:</strong>{" "}
                  Available
                </div>
              </li>
            </ul>
          </div>

          {/* About Me (Right on lg, Top on sm) */}
          <div className="lg:w-1/2 text-lg text-mutedgray">
            <h2 className="text-3xl lg:text-4xl font-bold mb-5 text-center lg:text-left text-richblack">
              The Journey Behind the Code!
            </h2>
            <p className="text-mutedgray text-sm mb-6">
              Driven by curiosity, fueled by challenge — my path into tech is a
              story of exploration, passion, and purpose.
            </p>
            <p className="text-darkgray">
              I first stepped into the world of tech through cybersecurity —
              driven by a deep curiosity and an urge to explore the unknown. As
              I began learning Python, I naturally grew more interested in how
              things work behind the scenes. That curiosity soon led me to
              JavaScript and eventually into the world of web development. What
              started as a side path quickly became a full-fledged journey. I'm
              someone who thrives on thrill and challenge, and this field offers
              both — whether it's cracking a tough bug or building something
              from the ground up that actually works in the real world. Right
              now, I'm focused on full-stack development and cybersecurity,
              constantly pushing myself to learn more and build better. For me,
              it’s not just about the code — it’s about the excitement of the
              unknown and the satisfaction of creating something that matters.
            </p>
          </div>
        </div>
      </section>
      <section className="bg-lightgray min-h-screen">
        <ContactSection />
      </section>
    </>
  );
};

export default About;
