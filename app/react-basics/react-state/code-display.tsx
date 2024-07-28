"use client";

import { useState, useEffect, use } from "react";
import { SkeletonCode } from "./skeleton-code";

export const CodeDisplay = ({
  code,
  pendingHighlighter,
  onAnimationComplete,
}: {
  code: string[];
  pendingHighlighter: Promise<any>;
  onAnimationComplete: () => void;
}) => {
  const highlighter = use(pendingHighlighter);
  const [highlightedCode, setHighlightedCode] = useState<string>("");
  const [currentLine, setCurrentLine] = useState<number>(0);
  const codeline = code[currentLine];

  useEffect(() => {
    const highlighted = highlighter.codeToHtml(codeline, {
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
  }, [codeline, currentLine]);

  useEffect(() => {
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
  }, [codeline, currentLine, onAnimationComplete]);

  if (!highlightedCode) {
    return <SkeletonCode />;
  }

  return (
    <div className="bg-gray-950 rounded-md p-5">
      <div
        className="overflow-scroll whitespace-pre-wrap sm:overflow-hidden"
        dangerouslySetInnerHTML={{ __html: highlightedCode }}
      />
    </div>
  );
};
