import { useLayoutEffect, useRef } from "react";

export default function SlidingTabs({ children, labelledBy, label, current }) {
  const bar = useRef(null);
  const pill = useRef(null);

  useLayoutEffect(() => {
    const el = bar.current;
    const p = pill.current;
    if (!el || !p) return;
    const tab = el.querySelector('[aria-selected="true"], [aria-pressed="true"]');
    if (!tab) return;
    const place = (animate) => {
      if (!animate) p.style.transition = "none";
      p.style.transform = `translateX(${tab.offsetLeft}px)`;
      p.style.width = `${tab.offsetWidth}px`;
      if (!animate) {
        void p.offsetWidth;
        p.style.transition = "";
      }
    };
    place(false);
    const onResize = () => place(false);
    window.addEventListener("resize", onResize);
    const id = requestAnimationFrame(() => place(true));
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", onResize);
    };
  }, [current]);

  return (
    <div className="tabs t-tabs" role="tablist" aria-labelledby={labelledBy} aria-label={label} ref={bar}>
      <span className="t-tabs-pill" ref={pill} aria-hidden="true" />
      {children}
    </div>
  );
}
