import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CH, FLOW } from "../data.js";

const Scene = lazy(() => import("../scene/Scene.jsx"));
const CHAPTERS = ["hero", "scatter", "connect", "flow", "settle"];

function chapterAt(p) {
  for (const c of CHAPTERS) if (p >= CH[c][0] && p < CH[c][1]) return c;
  return "settle";
}

export default function Story({ reduce, compact }) {
  const section = useRef(null);
  const progress = useRef(0);
  const [chapter, setChapter] = useState("hero");
  const [step, setStep] = useState(0);
  const [active, setActive] = useState(true);
  const [webgl, setWebgl] = useState(true);

  useEffect(() => {
    try {
      const c = document.createElement("canvas");
      setWebgl(!!(c.getContext("webgl2") || c.getContext("webgl")));
    } catch {
      setWebgl(false);
    }
  }, []);

  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: section.current,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const p = self.progress;
        progress.current = p;
        const c = chapterAt(p);
        setChapter((prev) => (prev === c ? prev : c));
        const f = Math.min(FLOW.length - 1, Math.floor(Math.min(1, Math.max(0, (p - CH.flow[0] - 0.02) / (CH.flow[1] - CH.flow[0] - 0.04))) * (FLOW.length - 1) + 0.15));
        setStep((prev) => (prev === f ? prev : f));
      },
      onToggle: (self) => setActive(self.isActive),
    });
    return () => st.kill();
  }, []);

  const jump = (c) => {
    const el = section.current;
    const top = el.offsetTop + (el.offsetHeight - window.innerHeight) * (CH[c][0] + 0.02);
    window.__lenis ? window.__lenis.scrollTo(top) : window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <section ref={section} className="story" id="story" aria-label="Opralvin One, told in one model">
      <div className="story-stick">
        <div className="story-scene">
          {webgl ? (
            <Suspense fallback={null}>
              <Scene progress={progress} active={active} reduce={reduce} compact={compact} />
            </Suspense>
          ) : (
            <p className="scene-fallback">Accounting, Inventory, Sales, Purchase, Manufacturing, HR, Projects and Point of Sale, connected to Opralvin One.</p>
          )}
        </div>

        <div className="story-copy">
          <div className={`ch ${chapter === "hero" ? "on" : ""}`} aria-hidden={chapter !== "hero"}>
            <h1>Every business, better connected.</h1>
            <p className="lead">Opralvin One brings your accounts, stock, sales, GST paperwork and team into one system, set up around the way you already work.</p>
            <div className="acts">
              <a className="btn amber" href="#book">Book a free walkthrough</a>
              <a className="tlink light" href="#film">Watch the 2-minute film</a>
            </div>
            <button className="scrollhint" type="button" onClick={() => jump("scatter")}>Scroll to see how it works</button>
          </div>

          <div className={`ch ${chapter === "scatter" ? "on" : ""}`} aria-hidden={chapter !== "scatter"}>
            <h2>Growth scatters a business.</h2>
            <p className="lead">Finance in a spreadsheet. Stock in a paper register. Orders typed in twice. Customers in three places, and nobody sure which number is right.</p>
          </div>

          <div className={`ch ${chapter === "connect" ? "on" : ""}`} aria-hidden={chapter !== "connect"}>
            <h2>Opralvin One connects it again.</h2>
            <p className="lead">One system, shaped around how you already work. Every department reads and writes the same record, so nobody re-types anything.</p>
          </div>

          <div className={`ch ${chapter === "flow" ? "on" : ""}`} aria-hidden={chapter !== "flow"}>
            <h2>Follow one order.</h2>
            <ol className="flow">
              {FLOW.map((f, i) => (
                <li key={f.title} className={i === step ? "now" : i < step ? "done" : ""}>
                  <b>{f.title}</b>
                  <span>{f.detail}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className={`ch ${chapter === "settle" ? "on" : ""}`} aria-hidden={chapter !== "settle"}>
            <h2>One order. Every department updated.</h2>
            <p className="lead">That is the whole idea. Now we shape it around your business.</p>
            <div className="acts">
              <a className="btn amber" href="#shape">See what we customise</a>
            </div>
          </div>
        </div>

        <ol className="story-nav" aria-label="Story chapters">
          {CHAPTERS.map((c) => (
            <li key={c}>
              <button type="button" className={chapter === c ? "on" : ""} onClick={() => jump(c)} aria-label={`Go to ${c === "hero" ? "start" : c}`} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

gsap.registerPlugin(ScrollTrigger);
