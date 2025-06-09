import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ProjectHighlights = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) console.error("Projects fetching error", error);
    else setProjects(data);
  };

  const settings = {
    dots: true,
    arrows: false,
    infinite: false,
    speed: 600,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="bg-lightgray py-10 min-h-screen">
      <div className="w-full px-4 md:px-10">
        <h2 className="text-4xl font-bold text-center text-richblack mb-2">
          Featured Projects
        </h2>
        <p className="text-center text-darkgray text-lg mb-10">
          A selection of my most impactful work — blending design,
          functionality, and performance.
        </p>

        {projects.length > 0 ? (
          <div className="flex justify-center">
            <div className="max-w-7xl w-full mx-auto px-4">
              <Slider {...settings}>
                {projects.map((project) => (
                  <div
                    key={project.id}
                    onClick={() => navigate(`/project/${project.id}`)}
                    className="cursor-pointer bg-sloughtgray shadow hover:shadow-md rounded-xl overflow-hidden p-4 transition-all mx-auto w-full max-w-sm"
                  >
                    {project.image && (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full max-h-48 object-cover rounded-md mb-4"
                      />
                    )}
                    <h3 className="text-xl font-bold text-richblack mb-2">
                      {project.title}
                    </h3>
                    <p className="text-mutedgray mb-4 line-clamp-2">
                      {project.short_description}
                    </p>
                    <div className="flex gap-4 text-sm items-center">
                      {project.live_link && (
                        <a
                          href={project.live_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-700 hover:text-black transition font-semibold"
                        >
                          Live Site
                        </a>
                      )}
                      {project.github_link && (
                        <a
                          href={project.github_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-verydarkgray text-sloughtgray p-2 rounded shadow hover:bg-darkgray transition"
                        >
                          GitHub
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">Loading projects...</p>
        )}
      </div>
    </section>
  );
};

export default ProjectHighlights;
