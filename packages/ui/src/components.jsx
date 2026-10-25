import { formatInr } from "./format.js";

export function Button({ children, tone, force, disabled }) {
  const names = ["btn", tone || "", force || ""].filter(Boolean).join(" ");
  return (
    <button className={names} type="button" disabled={disabled}>
      {children}
    </button>
  );
}

export function Field({ label, value, error, disabled, force }) {
  return (
    <label className={["field", error ? "error" : "", force || ""].filter(Boolean).join(" ")}>
      <span>{label}</span>
      <input defaultValue={value || ""} disabled={disabled} aria-invalid={error ? "true" : "false"} />
      {error ? <span className="msg">{error}</span> : null}
    </label>
  );
}

export function Stamp({ kind }) {
  const illustrative = kind === "illustrative";
  return <span className={illustrative ? "stamp illustrative" : "stamp"}>{illustrative ? "Illustrative" : "Posted"}</span>;
}

export function Figure({ amount, caption }) {
  return (
    <div>
      <p className="figure">{formatInr(amount)}</p>
      <p>{caption}</p>
    </div>
  );
}

export function Rule() {
  return <hr className="rule" />;
}
