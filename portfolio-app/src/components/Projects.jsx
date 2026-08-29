import React from "react";
import { SectionHeading } from "./Primitives.jsx";
import AVAWidget from "./projects/AVAWidget.jsx";
import CVWidget from "./projects/CVWidget.jsx";
import HefinWidget from "./projects/HefinWidget.jsx";

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative border-b border-zinc-800 bg-gradient-to-b from-indigo-950/40 via-zinc-950 to-zinc-950 px-4 py-20 sm:px-8"
    >
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="~/projects"
          title="Live system visualizers"
          eyebrowClass="text-indigo-400"
        />
        <p className="mb-10 max-w-2xl text-sm text-zinc-400">
          Each panel below is a running simulation of the project's core engineering logic —
          not a screenshot.
        </p>

        <div className="grid gap-6 lg:grid-cols-2">
          <AVAWidget />
          <CVWidget />
          <div className="lg:col-span-2">
            <div className="mx-auto max-w-2xl">
              <HefinWidget />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
