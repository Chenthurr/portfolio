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
    <div className="min-h-screen scroll-smooth bg-zinc-950 font-sans text-zinc-200">
      <Nav />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Achievements />
      <Contact />
    </div>
  );
}
