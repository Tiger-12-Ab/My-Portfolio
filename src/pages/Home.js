import React from "react";

import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import ProjectHighlights from "../components/ProjectHighlights";
import ContactSection from "../components/ContactSection";

const Home = () => {
  return (
    <div className="bg-lightgray min-h-screen">
      <HeroSection />
      <AboutSection />
      <ProjectHighlights />
      <ContactSection />
    </div>
  );
};

export default Home;
