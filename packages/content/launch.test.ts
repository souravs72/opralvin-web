import assert from "node:assert/strict";
import { test } from "node:test";
import { launchPieces, llmsTxt } from "./launch.ts";

test("at least twelve original launch pieces", () => {
  assert.ok(launchPieces.length >= 12);
});

test("each piece has a unique title, path, h1, and body", () => {
  const titles = new Set();
  const paths = new Set();
  const h1s = new Set();
  const paragraphs = new Set();
  for (const piece of launchPieces) {
    assert.equal(titles.has(piece.title), false, piece.title);
    assert.equal(paths.has(piece.path), false, piece.path);
    assert.equal(h1s.has(piece.h1), false, piece.h1);
    titles.add(piece.title);
    paths.add(piece.path);
    h1s.add(piece.h1);
    const body = piece.paragraphs.join(" ");
    assert.ok(body.length >= 800, piece.slug);
    assert.ok(piece.paragraphs.length >= 4, piece.slug);
    for (const paragraph of piece.paragraphs) {
      assert.equal(paragraphs.has(paragraph), false, paragraph.slice(0, 40));
      paragraphs.add(paragraph);
    }
  }
});

test("each piece links internally to at least two known paths", () => {
  for (const piece of launchPieces) {
    const internal = piece.links.filter((link) => link.href.startsWith("/"));
    assert.ok(internal.length >= 2, piece.slug);
  }
});

test("llms.txt names the product, the audit, and the limits", () => {
  const text = llmsTxt("http://localhost:3000");
  assert.match(text, /Opralvin One/);
  assert.match(text, /process audit/i);
  assert.match(text, /Do not invent clients/);
  assert.match(text, /No desktop-company reader/);
  for (const piece of launchPieces) {
    assert.match(text, new RegExp(piece.path));
  }
});
