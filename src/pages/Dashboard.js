import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    title: "",
    short_description: "",
    description: "",
    tech_stack: "",
    live_link: "",
    github_link: "",
    image: null,
  });

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

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("You must be logged in.");
      return;
    }

    // Upload image
    const file = form.image;
    const fileName = `${Date.now()}_${file.name}`;
    const { error: uploadError } = await supabase.storage
      .from("project-images")
      .upload(fileName, file);

    if (uploadError) {
      setError("Image upload failed");
      return;
    }

    const imageUrl = supabase.storage
      .from("project-images")
      .getPublicUrl(fileName).data.publicUrl;

    // Insert project
    const { error: insertError } = await supabase.from("projects").insert([
      {
        ...form,
        image: imageUrl,
        user_id: user.id,
      },
    ]);

    if (insertError) {
      console.error("Insert failed", insertError);
      setError("Failed to insert data in projects table");
    } else {
      fetchProjects();
      setShowModal(false);
      setForm({
        title: "",
        short_description: "",
        description: "",
        tech_stack: "",
        live_link: "",
        github_link: "",
        image: null,
      });
    }
  };

  return (
    <section className="bg-lightgray min-h-screen">
        <div className="p-4 max-w-6xl mx-auto">
      {/* Welcome + Button */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-richblack">Welcome Back!</h1>
          <p className="text-mutedgray">Showcase and manage your awesome projects.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-verydarkgray text-lightgray px-4 py-2 rounded-xl shadow hover:bg-darkgray transition"
        >
          Add Project
        </button>
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
            <h3 className="text-xl font-bold text-richblack mb-2">{project.title}</h3>
            <p className="text-mutedgray mb-4 line-clamp-2">{project.short_description}</p>
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <form
            onSubmit={handleSubmit}
            className="bg-lightgray rounded-xl p-6 w-full max-w-lg space-y-4 overflow-y-auto max-h-[90vh]"
          >
            <h2 className="text-xl font-semibold text-richblack">Add New Project</h2>

            {error && <p className="text-red-600">{error}</p>}

            {["title", "short_description", "description", "tech_stack", "live_link", "github_link"].map((field) => (
              <input
                key={field}
                type="text"
                name={field}
                placeholder={field.replace("_", " ")}
                value={form[field]}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required={field !== "github_link"}
              />
            ))}

            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full"
              required
            />

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="text-gray-600 hover:underline"
              >
                Cancel
              </button>
              <button type="submit" className="bg-verydarkgray hover:bg-darkgray text-lightgray px-4 py-2 rounded-xl">
                Save
              </button>
            </div>
          </form>
        </div>
      )}
      {error && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
    <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
      <h2 className="text-lg font-semibold text-red-600 mb-4">Error</h2>
      <p className="text-gray-700 mb-6">{error}</p>
      <button
        onClick={() => setError("")}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Close
      </button>
    </div>
  </div>
)}
        </div>
    </section>
  );
}
