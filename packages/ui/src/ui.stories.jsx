import "./ui.css";
import { Button, Field, Figure, Rule, Stamp } from "./components.jsx";

export default {
  title: "Ledger",
  parameters: { layout: "fullscreen" },
};

function Stage({ children }) {
  return <div className="stage">{children}</div>;
}

export const Buttons = {
  render: () => (
    <Stage>
      <div className="row">
        <Button>Book a free process audit</Button>
        <Button force="is-hover">Hover</Button>
        <Button force="is-focus">Focus</Button>
        <Button disabled>Disabled</Button>
        <Button tone="quiet">Read the audit note</Button>
      </div>
    </Stage>
  ),
};

export const Fields = {
  render: () => (
    <Stage>
      <Field label="City" />
      <Field label="Firm" value="Sample Traders" />
      <Field label="Phone" error="Use a 10-digit mobile number." />
      <Field label="Email" value="{{PUBLIC_EMAIL}}" disabled />
      <Field label="GSTIN" force="is-focus" value="Not a real GSTIN" />
    </Stage>
  ),
};

export const Stamps = {
  render: () => (
    <Stage>
      <div className="row">
        <Stamp kind="posted" />
        <Stamp kind="illustrative" />
      </div>
    </Stage>
  ),
};

export const Figures = {
  render: () => (
    <Stage>
      <Figure amount={1234567} caption="Illustrative amount. Not a client result." />
      <Rule />
    </Stage>
  ),
};
