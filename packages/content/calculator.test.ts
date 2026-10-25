import assert from "node:assert/strict";
import { test } from "node:test";
import { formatInr, parseDayRate, quoteWork } from "./calculator.ts";

test("unset day rate stays a token, never a rupee invention", () => {
  const rate = parseDayRate("{{DAY_RATE}}");
  const quote = quoteWork(12, rate);
  assert.equal(quote.ok, true);
  assert.equal(quote.labelled, "token");
  assert.equal(quote.totalRupees, null);
  assert.equal(quote.display, "12 × {{DAY_RATE}}");
});

test("empty or junk rate falls back to the token", () => {
  assert.equal(parseDayRate("").kind, "token");
  assert.equal(parseDayRate("nope").kind, "token");
  assert.equal(parseDayRate("-10").kind, "token");
});

test("a numeric rate multiplies days with Indian grouping", () => {
  const quote = quoteWork(12, parseDayRate("18000"));
  assert.equal(quote.ok, true);
  assert.equal(quote.labelled, "computed");
  assert.equal(quote.totalRupees, 216000);
  assert.equal(quote.display, "₹2,16,000");
  assert.equal(formatInr(1234567), "₹12,34,567");
});

test("days must be a whole number from 1 to 90", () => {
  const rate = parseDayRate("1000");
  assert.equal(quoteWork(0, rate).ok, false);
  assert.equal(quoteWork(1.5, rate).ok, false);
  assert.equal(quoteWork(91, rate).ok, false);
  assert.equal(quoteWork(1, rate).ok, true);
  assert.equal(quoteWork(90, rate).ok, true);
});
