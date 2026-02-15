import React from "react";
import { JobList } from "@/features/jobs";

export const Homepage: React.FC = () => {
  return (
    <main className="layout-grid">
      {/* COLUMN 1: Left (Empty/Minimal) */}
      <aside className="col-sidebar" />

      {/* COLUMN 2: Main Feed (Infinite Scroll Area) */}
      <section className="col-main">
        <div className="min-h-screen">
          <JobList />
        </div>
      </section>

      {/* COLUMN 3: Developer Portfolio */}
      <aside className="col-right">
        <div className="p-xl space-y-6">
          <section>
            <h2 className="text-[10px] font-800 text-gray-400 uppercase tracking-widest mb-3">
              Developer
            </h2>
            <p className="text-xs leading-relaxed text-muted">
              Architecting interfaces that transform complex APIs into seamless
              visual experiences.{" "}
              <strong className="text-black">Frontend Engineering</strong>.
            </p>

            <div className="flex flex-col gap-2 mt-6">
              <a
                href="mailto:timtjoe@gmail.com"
                className="text-xs font-500 hover:text-primary"
              >
                Email
              </a>
              <a
                href="https://github.com/timtjoe"
                target="_blank"
                className="text-xs font-500 hover:text-secondary"
              >
                GitHub
              </a>
            </div>
          </section>
        </div>
      </aside>
    </main>
  );
};
