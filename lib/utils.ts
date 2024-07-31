import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { createHighlighter } from "shiki";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function initHighlighter() {
  return createHighlighter({
    themes: ["ayu-dark"],
    langs: ["jsx"],
  });
}

export const createNumberDispenser = () => {
  const numbers = [1, 2, 3, 4];
  let current = 0;
  return () => numbers.at(current++ % 4) || 0;
};
