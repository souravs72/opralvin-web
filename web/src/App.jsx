import { useEffect, useState } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Story from "./sections/Story.jsx";
import { Shape, Docs, Film, Rollout, Letter, Questions, Book, Footer } from "./sections/Sections.jsx";

gsap.registerPlugin(ScrollTrigger);

const Mark = () => (
  <svg viewBox="0 0 200 130" aria-hidden="true" className="mark-svg">
    <circle cx="66" cy="65" r="50" fill="none" stroke="currentColor" strokeWidth="16" />
    <circle cx="134" cy="65" r="50" fill="none" stroke="#f2a33a" strokeWidth="16" />
  </svg>
);

function useMedia(q) {
  const [m, setM] = useState(() => typeof window !== "undefined" && window.matchMedia(q).matches);
  useEffect(() => {
    const mq = window.matchMedia(q);
    const on = () => setM(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [q]);
  return m;
}

export default function App() {
  const reduce = useMedia("(prefers-reduced-motion: reduce)");
  const compact = useMedia("(max-width: 860px)");
  const [onStage, setOnStage] = useState(true);

  // Smooth scroll, driven by GSAP's ticker so scroll-linked scenes and scrolling share one clock.
  useEffect(() => {
    if (reduce) return;
    const lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 0.95, smoothWheel: true });
    window.__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    const anchors = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const el = document.querySelector(a.getAttribute("href"));
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: -64, duration: 1.4 });
    };
    document.addEventListener("click", anchors);
    return () => {
      document.removeEventListener("click", anchors);
      gsap.ticker.remove(tick);
      lenis.destroy();
      window.__lenis = null;
    };
  }, [reduce]);

  // Header colour follows the section underneath it.
  useEffect(() => {
    const st = ScrollTrigger.create({ trigger: "#story", start: "top top", end: "bottom 64px", onToggle: (s) => setOnStage(s.isActive) });
    return () => st.kill();
  }, []);

  // One entrance per section block, only for content below the first screen.
  useEffect(() => {
    if (reduce || compact) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray("[data-rise]").forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight) return;
        gsap.from(el.querySelectorAll(":scope > * > *"), {
          y: 24,
          opacity: 0,
          duration: 0.9,
          ease: "expo.out",
          stagger: 0.08,
          scrollTrigger: { trigger: el, start: "top 82%", once: true },
        });
      });
    });
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);
    return () => {
      ctx.revert();
      window.removeEventListener("load", refresh);
    };
  }, [reduce, compact]);

  return (
    <>
      <a className="skip" href="#shape">Skip the story</a>
      <header className={`bar ${onStage ? "dark" : ""}`}>
        <div className="wrap bar-in">
          <a className="brand" href="#story" aria-label="Opralvin, back to start"><Mark />Opralvin</a>
          <nav aria-label="Main">
            <a className="hide-s" href="#shape">What we shape</a>
            <a className="hide-s" href="#docs">Documents</a>
            <a className="hide-s" href="#film">Film</a>
            <a className="hide-s" href="#how">How we work</a>
            <a className="btn small amber" href="#book">Book a walkthrough</a>
          </nav>
        </div>
      </header>
      <main>
        <Story reduce={reduce} compact={compact} />
        <div data-rise><Shape /></div>
        <div data-rise><Docs /></div>
        <Film />
        <Rollout />
        <div data-rise><Letter /></div>
        <div data-rise><Questions /></div>
        <Book />
      </main>
      <Footer />
    </>
  );
}
