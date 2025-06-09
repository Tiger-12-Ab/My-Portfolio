import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";

export default function Projects() {
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

  return (
    <section className="bg-lightgray min-h-screen">
      <div className="p-4 pt-8 max-w-6xl mx-auto">
        {/* Welcome + Button */}
        <div className=" justify-center items-center mb-6 text-center">
          <div>
            <h1 className="text-3xl font-bold text-richblack                                    ">Projects & Builds</h1>
            <p className="text-mutedgray">
              From concept to execution — a showcase of challenges solved and ideas realized.
            </p>
          </div>
        </div>
          {/* Project Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                onClick={() => navigate(`/project/${project.id}`)}
                className="border rounded-xl p-4 shadow hover:shadow-md transition cursor-pointer bg-sloughtgray"
              >
                {/* Image added here */}
                {project.image && (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full max-h-48 object-cover rounded-md mb-3"
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
          </div>
        
      </div>
      
    </section>
  );
}
