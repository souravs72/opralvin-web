import assert from "node:assert/strict";
import { test } from "node:test";
import { scoreAnswers } from "./assessment.ts";

test("all no is zero of four", () => {
  assert.deepEqual(scoreAnswers({}), { score: 0, max: 4 });
});

test("two yes is two of four", () => {
  assert.deepEqual(scoreAnswers({ godowns: true, sheet: true }), { score: 2, max: 4 });
});

test("all yes is four of four", () => {
  assert.deepEqual(
    scoreAnswers({ godowns: true, sheet: true, accountant: true, gst: true }),
    { score: 4, max: 4 },
  );
});
