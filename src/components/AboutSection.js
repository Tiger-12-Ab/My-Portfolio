import React from "react";
import { FaReact, FaNodeJs, FaGitAlt, FaDatabase } from "react-icons/fa";
import { SiTailwindcss, SiFirebase, SiMongodb } from "react-icons/si";
import { SiNextdotjs } from 'react-icons/si';


const AboutSection = () => {
  return (
    <section className="bg-lightgray py-20 px-6 lg:px-20 text-richblack">
      {/* First Row: Timeline & About */}
      <div className="max-w-6xl mx-auto flex flex-col-reverse lg:flex-row gap-16 mb-24">
        {/* Timeline (Left on lg, Bottom on sm) */}
        <div className="lg:w-1/2">
          <h3 className="text-2xl font-semibold mb-6">Timeline</h3>
          <ul className="border-l-4 border-verydarkgray pl-6 space-y-6">
            <li>
              <div className="text-md font-semibold">
                2025 – Freelance Developer
              </div>
              <p className="text-sm text-mutedgray">
                Built client websites, improved UX/UI, and delivered full-stack
                projects.
              </p>
            </li>
            <li>
              <div className="text-md font-semibold">
                2024 – Completed Full-Stack Bootcamp
              </div>
              <p className="text-sm text-mutedgray">
                Gained proficiency in React, Node.js, and backend services.
              </p>
            </li>
          </ul>
        </div>

        {/* About Me (Right on lg, Top on sm) */}
        <div className="lg:w-1/2 text-lg text-mutedgray">
          <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-center lg:text-left text-richblack">
            About Me
          </h2>
          <p>
            I'm Abrar Hossain, a full-stack developer with a strong grasp of
            both frontend and backend technologies. I specialize in building
            scalable, high-performance web applications with a focus on clean
            code, responsive design, and user experience.
          </p>
        </div>
      </div>

      {/* Second Row: Tools & Skills */}
      <div className="max-w-6xl mx-auto flex flex-col-reverse lg:flex-row gap-16">
        {/* Tools (Left on lg, Bottom on sm) */}
        <div className="lg:w-1/2">
          <h3 className="text-2xl font-semibold mb-6">Tools I Use</h3>
          <div className="flex flex-wrap justify-start gap-10 text-4xl text-darkgray">
            <SiNextdotjs title="Next.js" />
            <FaReact title="React" />
            <FaNodeJs title="Node.js" />
            <SiTailwindcss title="Tailwind CSS" />
            <SiFirebase title="Firebase" />
            <FaDatabase title="SQL / NoSQL" />
            <FaGitAlt title="Git" />
            <SiMongodb title="MongoDB" />
          </div>
        </div>

        {/* Skills (Right on lg, Top on sm) */}
        <div className="lg:w-1/2">
          <h3 className="text-2xl font-semibold mb-6">Skills</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-6 text-center">
            <span className="bg-lightgray py-2 px-4 rounded shadow">React</span>
            <span className="bg-lightgray py-2 px-4 rounded shadow">
              Node.js
            </span>
            <span className="bg-lightgray py-2 px-4 rounded shadow">
              Express.js
            </span>
            <span className="bg-lightgray py-2 px-4 rounded shadow">
              HTML5
            </span>
            <span className="bg-lightgray py-2 px-4 rounded shadow">
              Tailwind CSS
            </span>
            <span className="bg-lightgray py-2 px-4 rounded shadow">
              JavaScript
            </span>
            <span className="bg-lightgray py-2 px-4 rounded shadow">
              Python
            </span>
            <span className="bg-lightgray py-2 px-4 rounded shadow">
              Firebase
            </span>
            <span className="bg-lightgray py-2 px-4 rounded shadow">
              Supabase
            </span>
            <span className="bg-lightgray py-2 px-4 rounded shadow">
              REST APIs
            </span>
            <span className="bg-lightgray py-2 px-4 rounded shadow">Git</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
