import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../supabase";
import { MoreVertical, Trash2, Pencil } from "lucide-react";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Fetch current user
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error.message);
        return;
      }
      setUser(user);
    };
    fetchUser();
  }, []);

  // Fetch the project
  const fetchProject = async (projectId) => {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("id", projectId)
      .single();

    if (error) {
      console.error("Error fetching project:", error);
    } else {
      setProject(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProject(id);
  }, [id]);

  // Update project handler
  const handleUpdate = async () => {
    const updatedProject = {
      title: project.title || "",
      short_description: project.short_description || "",
      description: project.description || "",
      tech_stack: project.tech_stack || "",
      live_link: project.live_link || "",
      github_link: project.github_link || "",
    };

    const { error } = await supabase
      .from("projects")
      .update(updatedProject)
      .eq("id", project.id);

    if (!error) {
      setShowEditModal(false);
      fetchProject(project.id);
    } else {
      console.error("Project update failed", error);
    }
  };

  // Handle image upload
  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !user || !project?.id) return;

    const fileExt = file.name.split(".").pop();
    const fileName = `${user.id}-${Date.now()}.${fileExt}`;
    const filePath = `project-images/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("project-images")
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      console.error("Image upload error:", uploadError);
      return;
    }

    const { data: publicData } = supabase.storage
      .from("project-images")
      .getPublicUrl(filePath);

    const publicUrl = publicData?.publicUrl;

    const { error: dbError } = await supabase
      .from("projects")
      .update({ image: publicUrl })
      .eq("id", project.id);

    if (dbError) {
      console.error("Error updating image URL in database:", dbError);
      return;
    }

    setProject({ ...project, image: publicUrl });
    fetchProject(project.id);
  };

  // Delete project
  const handleDelete = async () => {
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) {
      alert("Error deleting project");
    } else {
      navigate("/dashboard");
    }
  };

  if (loading) return <p className="text-center mt-8">Loading...</p>;
  if (!project) return <p className="text-center mt-8">Project not found</p>;

  return (
    <section className="bg-lightgray min-h-screen">
      <div className="max-w-6xl mx-auto p-4">
        <div className="flex flex-col lg:flex-row gap-6 p-6">
          {/* Project Image */}
          {project.image && (
            <img
              src={project.image}
              alt={project.title}
              className="w-full lg:w-1/2 rounded-lg object-fill max-h-96"
            />
          )}

          {/* Project Info */}
          <div className="flex-1 relative">
            {/* Owner Actions */}
            {user && project.user_id === user.id && (
              <div className="absolute top-0 right-0">
                <button
                  onClick={() => setShowMenu((prev) => !prev)}
                  className="p-2  rounded-full"
                >
                  <MoreVertical size={20} />
                </button>
                {showMenu && (
                  <div className="absolute right-0 mt-2 bg-white border rounded shadow z-10">
                    <button
                      onClick={() => {
                        setShowEditModal(true);
                        setShowMenu(false);
                      }}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left"
                    >
                      <Pencil size={16} /> Edit
                    </button>
                    <button
                      onClick={() => {
                        setShowDeleteModal(true);
                        setShowMenu(false);
                      }}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left text-red-600"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </div>
                )}
              </div>
            )}

            <h1 className="text-2xl font-bold text-richblack mb-2">
              {project.title}
            </h1>
            <p className="text-mutedgray mb-2">{project.short_description}</p>
            <p className="text-sm text-darkgray">{project.description}</p>

            {project.tech_stack && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center mt-4 items-center">
                {project.tech_stack.split(",").map((tech, index) => (
                  <span
                    key={index}
                    className="bg-white py-2 px-4 rounded shadow text-sm font-medium"
                  >
                    {tech.trim()}
                  </span>
                ))}
              </div>
            )}

            <div className="flex flex-wrap gap-4 mt-6 text-sm items-center">
              {project.live_link && (
                <a
                  href={project.live_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-darkgray hover:text-black font-semibold "
                >
                  Live Site
                </a>
              )}
              {project.github_link && (
                <a
                  href={project.github_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-verydarkgray text-lightgray p-2 rounded shadow hover:bg-darkgray transition"
                >
                  GitHub
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Edit Modal */}
        {showEditModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded p-6 w-full max-w-xl">
              <h2 className="text-xl font-bold mb-4">Edit Project</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Title"
                  value={project.title}
                  onChange={(e) =>
                    setProject({ ...project, title: e.target.value })
                  }
                  className="w-full border rounded p-2"
                />
                <input
                  type="text"
                  placeholder="Short Description"
                  value={project.short_description}
                  onChange={(e) =>
                    setProject({
                      ...project,
                      short_description: e.target.value,
                    })
                  }
                  className="w-full border rounded p-2"
                />
                <textarea
                  placeholder="Description"
                  value={project.description}
                  onChange={(e) =>
                    setProject({ ...project, description: e.target.value })
                  }
                  className="w-full border rounded p-2"
                />
                <input
                  type="text"
                  placeholder="Tech Stack (comma separated)"
                  value={project.tech_stack}
                  onChange={(e) =>
                    setProject({ ...project, tech_stack: e.target.value })
                  }
                  className="w-full border rounded p-2"
                />
                <input
                  type="text"
                  placeholder="Live Link"
                  value={project.live_link}
                  onChange={(e) =>
                    setProject({ ...project, live_link: e.target.value })
                  }
                  className="w-full border rounded p-2"
                />
                <input
                  type="text"
                  placeholder="GitHub Link"
                  value={project.github_link}
                  onChange={(e) =>
                    setProject({ ...project, github_link: e.target.value })
                  }
                  className="w-full border rounded p-2"
                />
                <input
                  id="photo"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="mb-4"
                />
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button
                  className="px-4 py-2 bg-gray-300 rounded"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-richblack text-white rounded"
                  onClick={handleUpdate}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4 text-red-600">
                Confirm Delete
              </h2>
              <p className="mb-4 text-mutedgray">
                Are you sure you want to delete this project? This action cannot
                be undone.
              </p>
              <div className="flex justify-end gap-2">
                <button
                  className="px-4 py-2 bg-gray-300 rounded"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-red-600 text-white rounded"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectDetails;
