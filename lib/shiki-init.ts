import { createHighlighter } from "shiki";

export function initHighlighter() {
  return createHighlighter({
    themes: ["ayu-dark"],
    langs: ["jsx"],
  });
}
