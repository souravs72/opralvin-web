import { useEffect } from "react";

import Story from "./sections/Story.jsx";
import { Shape, Docs, Ledger, School, Rollout, Letter, Questions, Book, Footer } from "./sections/Sections.jsx";

const Mark = () => (
  <svg viewBox="0 0 200 130" aria-hidden="true" className="mark-svg">
    <circle cx="66" cy="65" r="50" fill="none" stroke="currentColor" strokeWidth="16" />
    <circle className="mark-join" cx="134" cy="65" r="50" fill="none" stroke="currentColor" strokeWidth="16" />
  </svg>
);

export default function App() {
  useEffect(() => {
    const anchors = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const el = document.querySelector(a.getAttribute("href"));
      if (!el) return;
      e.preventDefault();
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    };
    document.addEventListener("click", anchors);
    return () => document.removeEventListener("click", anchors);
  }, []);

  return (
    <>
      <a className="skip" href="#shape">Skip to what we change</a>
      <header className="bar">
        <div className="wrap bar-in">
          <a className="brand" href="#story" aria-label="Opralvin, back to start"><Mark />Opralvin</a>
          <nav aria-label="Main">
            <a className="hide-s" href="#shape">What we change</a>
            <a className="hide-s" href="#ledger">One posting</a>
            <a className="hide-s" href="#school">Schools</a>
            <a className="hide-s" href="#how">How we work</a>
            <a className="btn small amber" href="#book">Book a free process audit</a>
          </nav>
        </div>
      </header>
      <main id="main">
        <Story />
        <Shape />
        <Docs />
        <Ledger />
        <School />
        <Rollout />
        <Letter />
        <Questions />
        <Book />
      </main>
      <Footer />
    </>
  );
}
