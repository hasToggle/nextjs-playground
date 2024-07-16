"use client";

import { useState, useEffect } from "react";
import { createHighlighter } from "shiki";
import { SkeletonCode } from "./skeleton-code";

export const CodeDisplay = ({
  code,
  onAnimationComplete,
}: {
  code: string[];
  onAnimationComplete: () => void;
}) => {
  const [highlightedCode, setHighlightedCode] = useState<string>("");
  const [currentLine, setCurrentLine] = useState<number>(0);
  const [highlighter, setHighlighter] = useState<any>(null);
  const codeline = code[currentLine];

  useEffect(() => {
    async function runHighlighter() {
      setHighlighter(
        await createHighlighter({
          themes: ["ayu-dark"],
          langs: ["jsx"],
        })
      );
    }
    runHighlighter();
  }, []);

  useEffect(() => {
    if (highlighter) {
      const highlighted = highlighter.codeToHtml(code[currentLine], {
        lang: "jsx",
        theme: "ayu-dark",
      });

      const lines = highlighted.split("\n");
      const highlightedLines = lines
        .map((line: string, index: number) => {
          if (index === currentLine) {
            return `<span class="highlighted-line">${line}</span>`;
          }
          return line;
        })
        .join("\n");

      setHighlightedCode(highlightedLines);
    }
  }, [code, highlighter, currentLine]);

  useEffect(() => {
    if (highlighter) {
      let interval: NodeJS.Timeout | undefined;
      const totalLines = codeline.split("\n").length - 1;
      if (currentLine < totalLines) {
        interval = setInterval(() => {
          setCurrentLine((prevLine) => prevLine + 1);
        }, 300);
      } else {
        onAnimationComplete();
      }
      return () => clearInterval(interval);
    }
  }, [code, codeline, highlighter, currentLine, onAnimationComplete]);

  if (!highlightedCode) {
    return <SkeletonCode />;
  }

  return (
    <div
      className="overflow-scroll whitespace-pre-wrap sm:overflow-hidden rounded-md m-2"
      dangerouslySetInnerHTML={{ __html: highlightedCode }}
    />
  );
};
