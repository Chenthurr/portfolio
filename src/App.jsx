import React from "react";
import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Projects from "./components/Projects.jsx";
import Skills from "./components/Skills.jsx";
import Achievements from "./components/Achievements.jsx";
import Contact from "./components/Contact.jsx";

export default function App() {
  return (
    <div className="min-h-screen bg-[#f7f2e8] font-sans text-[#1f2430] selection:bg-[#f3c36b] selection:text-[#1f2430]">
      <Nav />
      <main className="overflow-hidden">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Achievements />
        <Contact />
      </main>
    </div>
  );
}
