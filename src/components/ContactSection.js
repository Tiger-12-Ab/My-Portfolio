import React, { useState } from "react";
import { supabase } from "../supabase";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    message: "",
  });

  const [modal, setModal] = useState({
    isOpen: false,
    type: "success",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase.from("messages").insert([formData]);

    if (error) {
      setModal({
        isOpen: true,
        type: "error",
        message: "Something went wrong. Please try again.",
      });
    } else {
      setModal({
        isOpen: true,
        type: "success",
        message: "Message sent successfully!",
      });
      setFormData({ name: "", email: "", number: "", message: "" });
    }
  };

  const closeModal = () => {
    setModal({ ...modal, isOpen: false });
  };

  return (
    <section
      className="bg-fit bg-center bg-no-repeat py-16 relative"
      style={{
        backgroundImage: "url('/ContactSection.png')",
      }}
    >
      <div className="w-full h-full max-w-7xl mx-auto px-8">
        {/* Top Section: Heading, Tagline, Contact Info */}
        <div className="text-center mb-10 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-2 text-forest text-richbalck">Get in Touch</h2>
          <p className="text-darkgray mb-6">
            Have a project in mind or just want to connect? Feel free to reach out anytime.
          </p>
          <div className="space-y-2 text-sm text-verydarkgray">
            <div>
              <strong>Email:</strong>{" "}
              <a href="mailto:akibabrar2005@gmail.com" className="hover:underline">
                akibabrar2005@gmail.com
              </a>
            </div>
            <div>
              <strong>Phone:</strong>{" "}
              <a href="tel:+8801560005502" className="hover:underline">
                +880 156 000 5502
              </a>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="flex justify-start">
          <form
            onSubmit={handleSubmit}
            className="bg-transparent text-darkgray p-6 rounded-lg w-full max-w-md"
          >
            <div className="mb-4">
              <label className="block mb-1 text-sm">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your name"
                className="w-full px-4 py-2 bg-transparent border border-gray-400 rounded placeholder-gray-300 focus:outline-none focus:border-forest"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 text-sm">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Your email"
                className="w-full px-4 py-2 bg-transparent border border-gray-400 rounded placeholder-gray-300 focus:outline-none focus:border-forest"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 text-sm">Phone</label>
              <input
                type="text"
                name="number"
                value={formData.number}
                onChange={handleChange}
                placeholder="Your number"
                className="w-full px-4 py-2 bg-transparent border border-gray-400 rounded placeholder-gray-300 focus:outline-none focus:border-forest"
              />
            </div>

            <div className="mb-6">
              <label className="block mb-1 text-sm">Message</label>
              <textarea
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Your message"
                className="w-full px-4 py-2 bg-transparent border border-gray-400 rounded placeholder-gray-300 resize-none focus:outline-none focus:border-forest"
              />
            </div>

            <button
              type="submit"
              className="bg-verydarkgray text-lightgray px-6 py-2 rounded font-semibold hover:bg-darkgray transition w-full"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Modal */}
      {modal.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white text-gray-800 rounded-lg shadow-lg max-w-sm w-full p-6">
            <h3
              className={`text-xl font-semibold mb-2 ${
                modal.type === "success" ? "text-green-600" : "text-red-600"
              }`}
            >
              {modal.type === "success" ? "Success" : "Error"}
            </h3>
            <p className="mb-4">{modal.message}</p>
            <button
              onClick={closeModal}
              className="ml-auto block bg-verydarkgray text-lightgray px-4 py-2 rounded hover:bg-darkgray transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ContactSection;
