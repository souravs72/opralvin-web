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
      gsap.from(".story-talk, .posting", {
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
      <div className="hero-dark">
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
      <div className="wrap posting-wrap" id="ledger">
        <div className="posting" data-ui aria-label="Sample purchase receipt PR-0001">
          <article className="voucher">
            <div className="dh">
              <b className="co">Northline</b>
              <span className="kind">Purchase receipt<br /><small>PR-0001</small></span>
            </div>
            <div className="meta">
              <div>Supplier<b>Apex Mills</b></div>
              <div>Date<b>24 Oct 2026</b></div>
              <div>Accepted warehouse<b>Main</b></div>
              <div>Batch<b>B-2410</b></div>
            </div>
            <table>
              <thead><tr><th>Item</th><th className="n">Qty</th><th className="n">Amount</th></tr></thead>
              <tbody>
                <tr><td>12 mm steel rod</td><td className="n">10</td><td className="n">₹50,000</td></tr>
                <tr className="tot"><td>Received</td><td className="n">10</td><td className="n">₹50,000</td></tr>
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
              <p className="amt">₹50,000</p>
              <p>Stock in hand.</p>
            </div>
          </div>
        </div>
        <p className="words">Sample. Northline, 24 Oct 2026. Freight is a landed cost voucher. A count is a stock reconciliation.</p>
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
