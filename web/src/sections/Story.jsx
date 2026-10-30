import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function Story() {
  const root = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(".hline", {
        yPercent: 110,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.11,
      });
      gsap.from(".story-talk, .acts", {
        opacity: 0,
        duration: 0.5,
        delay: 0.95,
        ease: "power2.out",
      });
    },
    { scope: root }
  );

  return (
    <section className="story" id="story" aria-label="Opralvin One" ref={root}>
      <div className="story-mast">
        <figure className="triad" aria-label="Sample figures for one delivery to Riverside Metals" data-ui>
          <div>
            <p>Sales</p>
            <p className="amt">₹59,000</p>
            <p>SINV-0001</p>
          </div>
          <div>
            <p>Warehouse</p>
            <p className="amt">10</p>
            <p>12 mm steel rod</p>
          </div>
          <div>
            <p>Accounts</p>
            <p className="amt">Open</p>
            <p>Still unpaid</p>
          </div>
          <figcaption>Sample. Northline, 24 Oct 2026.</figcaption>
        </figure>
      </div>
      <div className="wrap story-hero">
        <h1>
          <span className="mask"><span className="hline">The same goods.</span></span>
          <span className="mask"><span className="hline">Three different numbers.</span></span>
        </h1>
        <div className="story-talk">
          <p className="lead">A purchase receipt posts quantity and value once.</p>
          <div className="acts">
            <a className="btn amber" href="#book">Book a free process audit</a>
          </div>
        </div>
      </div>
      <div className="wrap split" id="split">
        <h2>Where they split.</h2>
        <ul>
          <li>
            <a href="#ledger">
              <strong>Warehouse and books</strong>
              <span>One voucher. Quantity and value.</span>
              <span className="go">The posting</span>
            </a>
          </li>
          <li>
            <a href="#docs">
              <strong>Papers a buyer asks for</strong>
              <span>E-invoice from the sales invoice.</span>
              <span className="go">The papers</span>
            </a>
          </li>
          <li>
            <a href="#school">
              <strong>Student and fees</strong>
              <span>One record. No retyping.</span>
              <span className="go">The student</span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
