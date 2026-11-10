import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { BOOK, BRAND, CONTACT, DESKS, FAQ, FOOTER, HERO, HOW, HUD, NAV, OFFER, PAPERS, PIPELINE, SHAPES, STACK } from "./content.js";
import { mountWorld } from "./scene/world.js";
import { DocsStage, ShapePanel } from "./sections/Panels.jsx";
import SlidingTabs from "./ui/SlidingTabs.jsx";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Mark = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="square" aria-hidden="true">
    <circle cx="8" cy="12" r="5.2" />
    <circle cx="16" cy="12" r="5.2" />
  </svg>
);

function Crop() {
  return (
    <>
      <span className="crop c-tl" aria-hidden="true" />
      <span className="crop c-tr" aria-hidden="true" />
      <span className="crop c-bl" aria-hidden="true" />
      <span className="crop c-br" aria-hidden="true" />
    </>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  return (
    <header className={`nav-wrap${open ? " open" : ""}`}>
      <nav className="nav container" aria-label="Primary">
        <a className="brand" href="#hero" aria-label="Opralvin, back to start">
          <Mark />
          <span>{BRAND.name}</span>
        </a>
        <span className="nav-meta mono">{NAV.meta}</span>
        <ul className="nav-links mono">
          {NAV.links.map((l, i) => (
            <li key={l.href}>
              <a href={l.href}>
                <span className="n">{String(i + 1).padStart(2, "0")}</span>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a className="btn primary nav-cta" href="#book">
          <span>{NAV.cta}</span>
          <span className="arr" aria-hidden="true">→</span>
        </a>
        <button
          className="menu-btn"
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="menuPanel"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </nav>
      <div className="menu-panel mono" id="menuPanel" hidden={!open}>
        {NAV.links.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </a>
        ))}
        <a href="#book" onClick={() => setOpen(false)}>
          {NAV.cta}
        </a>
      </div>
    </header>
  );
}

function Terminal() {
  const root = useRef(null);
  useGSAP(
    () => {
      const typed = root.current.querySelector(".term-typed");
      const status = root.current.querySelector(".term-status");
      const caret = root.current.querySelector(".term-caret");
      const { command, result, steps } = HERO.terminal;
      const done = () => {
        typed.textContent = command;
        status.textContent = result;
        status.className = "term-status ok";
      };
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        done();
        caret.style.display = "none";
        return;
      }
      const run = () => {
        typed.textContent = "";
        status.textContent = "";
        status.className = "term-status";
        const c = { n: 0 };
        const tl = gsap.timeline({ onComplete: () => gsap.delayedCall(5.5, run) });
        tl.to(c, {
          n: command.length,
          duration: command.length * 0.055,
          ease: "none",
          delay: 1.2,
          onUpdate: () => {
            typed.textContent = command.slice(0, Math.round(c.n));
          },
        });
        tl.add(() => {
          status.className = "term-status run";
        }, "+=0.2");
        steps.forEach((step, i) => {
          tl.add(() => {
            status.textContent = `${step}`;
          });
          tl.to({}, { duration: 0.5 });
          if (i === steps.length - 1) {
            tl.add(() => {
              status.className = "term-status ok";
              status.textContent = result;
            });
          }
        });
      };
      run();
    },
    { scope: root }
  );
  return (
    <div className="term" id="term" ref={root} role="img" aria-label={`Terminal: ${HERO.terminal.command} returns ${HERO.terminal.result}`}>
      <span className="term-bar">
        <span>{HERO.terminal.barL}</span>
        <span>{HERO.terminal.barR}</span>
      </span>
      <code className="term-line" aria-hidden="true">
        <span className="term-prompt">$</span> <span className="term-typed" />
        <span className="term-caret" />
      </code>
      <span className="term-status" aria-hidden="true" />
    </div>
  );
}

function Hero() {
  const root = useRef(null);
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(".hline", { yPercent: 110, duration: 0.9, ease: "power3.out", stagger: 0.11 });
      gsap.from(".hero-rest", { opacity: 0, y: 16, duration: 0.55, delay: 0.95, ease: "power2.out" });
    },
    { scope: root }
  );
  return (
    <section className="hero" id="hero" ref={root} aria-label="Opralvin One">
      <Crop />
      <div className="container hero-inner">
        <div className="hero-meta">
          <span className="fig-cap hero-fig">{HERO.figure}</span>
        </div>
        <div className="hero-copy">
          <h1 data-calm>
            {HERO.headline.map((line, i) => (
              <span className="mask" key={line}>
                <span className={`hline${i === HERO.accent ? " em" : ""}`}>{line}</span>
              </span>
            ))}
          </h1>
          <p className="sub hero-rest" data-calm>{HERO.sub}</p>
          <div className="cta-row hero-rest">
            <a className="btn primary" href="#book">
              <span>{HERO.cta1}</span>
              <span className="arr" aria-hidden="true">→</span>
            </a>
            <a className="btn" href="#ledger">
              <span>{HERO.cta2}</span>
            </a>
          </div>
        </div>
        <div className="proof hero-rest">
          <Terminal />
          <div className="spec">
            <div className="spec-h mono">
              <span>{HERO.specTitle}</span>
              <span>{HERO.specId}</span>
            </div>
            <ul className="stats mono">
              {HERO.stats.map((s) => (
                <li key={s.label}>
                  <span className="stat-l">{s.label}</span>
                  <span className="lead" />
                  <span className="stat-v">{s.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pipe() {
  const host = useRef(null);
  useEffect(() => {
    const r = host.current;
    if (!r) return;
    const stages = PIPELINE.stages;
    const NS = "http://www.w3.org/2000/svg";
    const el = (name, attrs, parent) => {
      const n = document.createElementNS(NS, name);
      Object.entries(attrs).forEach(([k, v]) => n.setAttribute(k, String(v)));
      parent?.appendChild(n);
      return n;
    };
    const draw = () => {
      r.innerHTML = "";
      const w = Math.max(280, Math.floor(r.clientWidth));
      const hrz = w >= 760;
      const fw = hrz ? Math.min(230, Math.floor((w - 3 * 56) / 4)) : w;
      const fh = hrz ? 128 : 78;
      const gap = hrz ? Math.floor((w - 4 * fw) / 3) : 34;
      const body = (hrz ? fh : stages.length * fh + (stages.length - 1) * gap) + 44;
      const H = body + 64;
      const svg = el("svg", { width: w, height: H, viewBox: `0 0 ${w} ${H}`, "aria-hidden": "true" }, r);
      svg.style.overflow = "visible";
      stages.forEach((st, i) => {
        const x = hrz ? i * (fw + gap) : 0;
        const y = hrz ? 0 : i * (fh + gap);
        const g = el("g", { transform: `translate(${x} ${y})` }, svg);
        el("rect", { x: 0.5, y: 0.5, width: fw - 1, height: fh - 1, fill: "var(--bg)", stroke: "currentColor", "stroke-width": 1 }, g);
        const t1 = el("text", { x: 12, y: hrz ? 22 : fh / 2, fill: "currentColor", "font-size": 12, "font-family": "JetBrains Mono, monospace" }, g);
        t1.textContent = st.time;
        const t2 = el("text", { x: 12, y: hrz ? 78 : 28, fill: "currentColor", "font-size": 20, "font-weight": 500, "font-family": "Newsreader Variable, Newsreader, Georgia, serif" }, g);
        t2.textContent = st.label;
        const t3 = el("text", { x: 12, y: hrz ? 102 : 52, fill: "#5c5850", "font-size": 11, "font-family": "JetBrains Mono, monospace" }, g);
        t3.textContent = st.detail;
        if (i < stages.length - 1 && hrz) {
          el("line", { x1: fw, y1: fh / 2, x2: fw + gap, y2: fh / 2, stroke: "currentColor", "stroke-width": 1 }, g);
        }
      });
    };
    draw();
    const ro = new ResizeObserver(draw);
    ro.observe(r);
    return () => ro.disconnect();
  }, []);
  return (
    <section className="panel" id="posting" aria-labelledby="pipeTitle">
      <div className="container">
        <header className="sec-head" data-reveal>
          <h2 id="pipeTitle">{PIPELINE.title}</h2>
          <p>{PIPELINE.sub}</p>
        </header>
        <figure className="pipe-card" data-reveal>
          <div className="pipe" ref={host} />
          <figcaption className="fig-row mono">
            <span className="fig-cap">{PIPELINE.figure}</span>
            <span className="pipe-total">
              {PIPELINE.total} <b>{PIPELINE.totalTime}</b>
            </span>
          </figcaption>
        </figure>
        <ul className="points">
          {PIPELINE.points.map((pt) => (
            <li key={pt.title} data-reveal>
              <h3>{pt.title}</h3>
              <p>{pt.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Ledger() {
  return (
    <section className="panel" id="ledger" aria-label="Sample purchase receipt">
      <div className="container">
        <header className="sec-head">
          <h2>The posting, on paper.</h2>
          <p>Sample. Harborline, Nov 10, 2026. Freight is a landed-cost voucher. A count is a stock reconciliation.</p>
        </header>
        <div className="posting" data-ui>
          <article className="voucher">
            <div className="dh">
                <b className="co">Harborline</b>
              <span className="kind">
                Purchase receipt
                <br />
                <small>PR-0001</small>
              </span>
            </div>
            <div className="meta">
              <div>
                Supplier<b>Apex Mill</b>
              </div>
              <div>
                Date<b>Nov 10, 2026</b>
              </div>
              <div>
                Accepted warehouse<b>Main</b>
              </div>
              <div>
                Batch<b>B-2410</b>
              </div>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th className="n">Qty</th>
                  <th className="n">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>A36 steel bar</td>
                  <td className="n">10</td>
                  <td className="n">$50,000</td>
                </tr>
                <tr className="tot">
                  <td>Received</td>
                  <td className="n">10</td>
                  <td className="n">$50,000</td>
                </tr>
              </tbody>
            </table>
          </article>
          <div className="post-targets">
            <div>
              <p>Stock ledger</p>
              <p className="amt">+10</p>
              <p>Main. Inward.</p>
            </div>
            <div>
              <p>General ledger</p>
              <p className="amt">$50,000</p>
              <p>Stock in hand.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Desks() {
  const mark = (id) => {
    if (id) document.documentElement.dataset.desk = id;
    else delete document.documentElement.dataset.desk;
    document.querySelectorAll(".logo-tile[data-desk]").forEach((el) => {
      const on = el.getAttribute("data-desk") === id;
      el.classList.toggle("is-hot", !!id && on);
      el.classList.toggle("is-dim", !!id && !on);
    });
  };
  return (
    <section className="panel" id="desks" aria-labelledby="stackTitle">
      <div className="container">
        <header className="sec-head" data-calm>
          <h2 id="stackTitle">{STACK.title}</h2>
          <p>{STACK.sub}</p>
        </header>
        <div className="world-stage" data-stage="desks" aria-hidden="true" />
        <ul className="stack-grid">
          {DESKS.map((d, i) => (
            <li key={d.id}>
              <a
                className="logo-tile"
                href="#book"
                data-desk={d.id}
                onMouseEnter={() => mark(d.id)}
                onMouseLeave={() => mark("")}
                onFocus={() => mark(d.id)}
                onBlur={() => mark("")}
              >
                <span className="lt-n mono">{String(i + 1).padStart(2, "0")}</span>
                <span className="lt-name">{d.name}</span>
                <span className="lg">{d.sub}</span>
              </a>
            </li>
          ))}
        </ul>
        <p className="fig-cap mono fig-under">{STACK.figure}</p>
      </div>
    </section>
  );
}

function Papers() {
  return (
    <section className="panel" id="papers" aria-labelledby="h-docs">
      <div className="container">
        <header className="sec-head">
          <h2 id="h-docs">{PAPERS.title}</h2>
          <p>{PAPERS.sub}</p>
        </header>
        <DocsStage />
      </div>
    </section>
  );
}

function Shape() {
  const [cur, setCur] = useState("forms");
  const c = SHAPES.find((s) => s.id === cur);
  return (
    <section className="panel" id="shape" aria-labelledby="h-shape">
      <div className="container">
        <header className="sec-head" data-calm>
          <h2 id="h-shape">We shape it around how you already post.</h2>
          <p>The audit writes down who takes the order, who approves it, and which report you open in the morning. The screens follow that note.</p>
        </header>
        <div className="world-stage" data-stage="shape" aria-hidden="true" />
        <div className="shape-grid">
          <SlidingTabs label="What we customise" current={cur}>
            {SHAPES.map((s) => (
              <button key={s.id} role="tab" id={`tab-${s.id}`} aria-selected={cur === s.id} aria-controls="shape-panel" className="tab" onClick={() => setCur(s.id)}>
                {s.label}
              </button>
            ))}
          </SlidingTabs>
          <div className="shape-stage" role="tabpanel" id="shape-panel" aria-labelledby={`tab-${cur}`}>
            <ShapePanel id={cur} />
            <p className="shape-text" key={cur}>
              {c.text}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Offer() {
  return (
    <section className="panel" id="how" aria-labelledby="priceTitle">
      <div className="container">
        <header className="sec-head">
          <h2 id="priceTitle">{OFFER.title}</h2>
          <p>{OFFER.sub}</p>
        </header>
        <p className="fig-cap mono fig-under">{OFFER.figure}</p>
        <ul className="plans">
          {OFFER.plans.map((pl) => (
            <li key={pl.id}>
              <article className={`plan${pl.featured ? " featured" : ""}`}>
                <div className="plan-h mono">
                  <span>{pl.unit}</span>
                  {pl.featured ? <span className="badge">Usual path</span> : <span />}
                </div>
                <h3>{pl.name}</h3>
                <p className="blurb">{pl.blurb}</p>
                <div className="price">
                  <span className="amt">{pl.price}</span>
                  <span className="unit">{pl.unit}</span>
                </div>
                <ul className="feat">
                  {pl.feats.map((f) => (
                    <li key={f}>
                      <span className="tick">+</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a className="btn primary" href="#book">
                  {pl.cta}
                </a>
              </article>
            </li>
          ))}
        </ul>
        <div className="steps">
          {HOW.map(([a, b]) => (
            <div className="step" key={a}>
              <p className="s">{a}</p>
              <p className="d">{b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Questions() {
  return (
    <section className="faq" id="faq" aria-labelledby="h-faq">
      <div className="faq-head">
        <div className="container">
          <h2 id="h-faq">Questions owners ask.</h2>
        </div>
      </div>
      {FAQ.map(([q, a], i) => (
        <article className="faq-band" key={q} data-tone={i % 2 === 0 ? "sheet" : "ground"}>
          <div className="container faq-row">
            <h3>{q}</h3>
            <p>{a}</p>
          </div>
        </article>
      ))}
    </section>
  );
}

function Book() {
  const [picked, setPicked] = useState(["Sales", "Inventory", "Accounts"]);
  const [note, setNote] = useState("");
  const toggle = (n) => setPicked((p) => (p.includes(n) ? p.filter((x) => x !== n) : [...p, n]));
  const req = `Hello Opralvin, I would like a free process audit.\nDesks we run: ${picked.length ? picked.join(", ") : "not chosen yet"}.`;
  const mail = CONTACT.includes("{{")
    ? "#book"
    : `mailto:${CONTACT}?subject=${encodeURIComponent("Free process audit")}&body=${encodeURIComponent(req)}`;
  const copy = () => {
      const done = () => setNote("Copied. Paste it into an email.");
    try {
      navigator.clipboard.writeText(req).then(done, () => setNote("Select the text above and copy it."));
    } catch {
      setNote("Select the text above and copy it.");
    }
  };
  return (
    <section className="band-sec" id="book" aria-labelledby="h-book">
      <div className="container">
        <div className="band">
          <div className="band-copy">
            <h2 id="h-book">{BOOK.title}</h2>
            <p>{BOOK.lead}</p>
            <fieldset className="depts">
              <legend className="sr">Departments you run</legend>
              {DESKS.map((d) => (
                <label className="dept" key={d.id}>
                  <input type="checkbox" checked={picked.includes(d.name)} onChange={() => toggle(d.name)} />
                  <span>{d.name}</span>
                </label>
              ))}
            </fieldset>
            <div className="cmd">
              <pre aria-live="polite">{req}</pre>
              <button type="button" className="copy mono" onClick={copy}>
                Copy
              </button>
            </div>
            <div className="cta-row">
              <a className="btn primary" href={mail}>
                <span>Email this request</span>
                <span className="arr" aria-hidden="true">→</span>
              </a>
            </div>
            <p className="small">
              {CONTACT.includes("{{")
                ? `Copy the request and send it. The address is added when this page is published. ${note}`
                : `Or write to ${CONTACT}. ${note}`}
            </p>
          </div>
          <figure className="window">
            <div className="window-hole" aria-hidden="true">
              <Crop />
            </div>
            <figcaption className="fig-cap mono">The field stays with you through the close.</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="container foot-grid">
        <div className="foot-brand">
          <a className="brand" href="#hero">
            <Mark />
            <span>{BRAND.name}</span>
          </a>
          <p>{FOOTER.tagline}</p>
          <span className="status mono">
            <i />
            {FOOTER.status}
          </span>
        </div>
        <div className="foot-cols">
          <div>
            <h4>On this page</h4>
            <ul>
              {NAV.links.map((l) => (
                <li key={l.href}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Offer</h4>
            <ul>
              <li>
                <a href="#book">Free process audit</a>
              </li>
              <li>
                <a href="#how">Day rate</a>
              </li>
              <li>
                <a href="#faq">Questions</a>
              </li>
            </ul>
          </div>
          <div>
            <h4>Firm</h4>
            <ul>
              <li>{BRAND.founder}</li>
              <li>{BRAND.firm}</li>
              <li>{BRAND.tag}</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container foot-legal mono">
        <span>© 2026 {BRAND.firm}</span>
        <span>Sample names and figures on this page are illustrative.</span>
        <a href="#hero">Back to start</a>
      </div>
    </footer>
  );
}

function Hud() {
  const build = useRef(null);
  const time = useRef(null);
  const bar = useRef(null);
  useEffect(() => {
    const from = HUD.from;
    const to = HUD.to;
    let val = from;
    let lastN = -1;
    const ease = (t) => 1 - Math.pow(1 - t, 2.2);
    const tick = (dt) => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const g = Math.min(1, window.scrollY / (max * 0.8));
      const target = from + (to - from) * ease(g);
      val += (target - val) * (dt === 0 ? 1 : 1 - Math.exp(-7 * dt));
      const n = HUD.start + Math.floor(window.scrollY / 140);
      if (n !== lastN && build.current) {
        lastN = n;
        build.current.textContent = n.toLocaleString("en-IN");
      }
      if (time.current) time.current.textContent = `${val.toFixed(0)} d`;
      if (bar.current) bar.current.style.transform = `scaleX(${Math.min(1, (90 - val) / 60).toFixed(3)})`;
    };
    tick(0);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const onScroll = () => tick(0);
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }
    let t0 = performance.now();
    let id = 0;
    const loop = (t) => {
      tick(Math.max(0, Math.min(0.05, (t - t0) / 1000)));
      t0 = t;
      id = requestAnimationFrame(loop);
    };
    id = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(id);
  }, []);
  return (
    <aside className="hud mono" id="hud" aria-hidden="true">
      <div className="hud-h">
        <i className="hud-dot" />
        <span>{HUD.title}</span>
        <span>{HUD.id}</span>
      </div>
      <div className="hud-row">
        <span className="hud-k">{HUD.label}</span>
        <span className="lead" />
        <b ref={build}>128</b>
      </div>
      <div className="hud-row">
        <span className="hud-k">{HUD.median}</span>
        <span className="lead" />
        <b ref={time}>90 d</b>
      </div>
      <div className="hud-bar">
        <i ref={bar} />
      </div>
      <div className="hud-scale">
        <span>90</span>
        <span>60</span>
        <span>30 d</span>
      </div>
    </aside>
  );
}

export default function App() {
  const canvas = useRef(null);
  useEffect(() => {
    const el = canvas.current;
    if (!el) return undefined;
    let stop = () => {};
    try {
      stop = mountWorld(el) || (() => {});
    } catch (err) {
      console.error(err);
      el.classList.add("tunnel-fallback");
    }
    const anchors = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const node = document.querySelector(a.getAttribute("href"));
      if (!node) return;
      e.preventDefault();
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      node.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    };
    document.addEventListener("click", anchors);
    return () => {
      stop();
      document.removeEventListener("click", anchors);
    };
  }, []);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.utils.toArray("[data-reveal]").forEach((node) => {
      gsap.from(node, {
        y: 24,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: node, start: "top 86%" },
      });
    });
  });

  return (
    <>
      <a className="skip" href="#posting">
        Skip to the posting
      </a>
      <canvas className="tunnel" ref={canvas} aria-hidden="true" />
      <div className="guides" aria-hidden="true">
        <div className="container guides-in">
          {Array.from({ length: 12 }, (_, i) => (
            <i key={i} />
          ))}
        </div>
      </div>
      <Nav />
      <main id="main">
        <Hero />
        <Pipe />
        <Ledger />
        <Desks />
        <Papers />
        <Shape />
        <Offer />
        <Questions />
        <Book />
      </main>
      <Footer />
      <Hud />
    </>
  );
}
