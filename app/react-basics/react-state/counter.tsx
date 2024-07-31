"use client";

import { useState, useCallback, useReducer, type Reducer } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import { Boundary } from "@/components/ui/boundary";
import Button from "./button";
import { CodeDisplay } from "./code-display";

import { initHighlighter } from "@/lib/utils";

type State = {
  count: number;
  internalCount: number;
  disabled: boolean;
  message: string;
  reactMessage: string;
  color: "violet" | "default" | "pink" | "blue" | "cyan" | "orange" | undefined;
  label: string;
  animateRerendering: boolean;
};

type Action = {
  type: "updating" | "updated";
};

const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case "updating":
      return {
        ...state,
        internalCount: state.internalCount + 1,
        message: "The count did not increase, yet.",
        color: "pink",
        label: "React (waiting to re-render)",
        disabled: false,
        reactMessage:
          "You are now React. Click the button to re-render the component.",
      };
    case "updated":
      return {
        ...state,
        count: state.count + 1,
        message: "Re-rendered successfully, showing the current count now.",
        color: "violet",
        label: "React",
        animateRerendering: true,
        disabled: true,
        reactMessage: "",
      };
    default:
      throw new Error("Unknown action type.");
  }
};

const initialState: State = {
  count: 0,
  internalCount: 0,
  disabled: true,
  message: "Click the button to increase the count.",
  reactMessage: "",
  color: "violet",
  label: "React",
  animateRerendering: false,
};

export function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [componentToShow, setComponentToShow] = useState<
    "codeDisplay" | "buttonDisplay"
  >("buttonDisplay");

  const pendingHighlighter = initHighlighter();

  const handleAnimationComplete = useCallback(() => {
    setComponentToShow("buttonDisplay");
  }, []);

  const flipVariants = {
    initial: {
      rotateY: 90,
      opacity: 0,
    },
    animate: {
      rotateY: 0,
      opacity: 1,
    },
    exit: {
      rotateY: -90,
      opacity: 0,
    },
  };

  const codeSnippet_0 = `
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>You clicked {count} times.</p>
      <button onClick={() => setCount(count + 1)}>
        +1
      </button>
    </div>
  );
}`.trim();

  const codeSnippet_1 = `
function Counter() {
  const [count, setCount] = useState(0); // count = ${state.internalCount}
  return (
    <div>
      <p>You clicked {count} times.</p>
      <button onClick={() => setCount(count + 1)}>
        +1
      </button>
    </div>
  );
}`.trim();

  const codeSnippet_2 = `
function Counter() {
  const [count, setCount] = useState(0); // count = ${state.internalCount}
  return (
    <div>
      <p>You clicked {count} times.</p> {/* count = ${state.internalCount} */}
      <button onClick={() => setCount(count + 1)}>
        +1
      </button>
    </div>
  );
}`.trim();

  return (
    <>
      <Boundary
        labels={[state.label]}
        color={state.color}
        size="default"
        animateRerendering={false}
      >
        <Boundary
          labels={["internal state management"]}
          color={"default"}
          size="default"
          animateRerendering={false}
        >
          <div className="mb-7 mt-5">
            <span className="my-2 block">
              <span
                className={clsx(
                  "inline rounded-md px-3 py-1.5 border border-gray-300",
                  {
                    "bg-hastoggle-pink/60 text-white": state.disabled === false,
                  }
                )}
              >
                count: {state.internalCount}{" "}
              </span>
            </span>
            <span className="relative inline-flex">
              <Button
                focus={!state.disabled}
                variant="pink"
                onClick={() => {
                  dispatch({ type: "updated" });
                  setComponentToShow("codeDisplay");
                }}
                disabled={state.disabled}
              >
                Render
              </Button>
            </span>
            <div className="mb-12 mt-8 h-3 text-sm font-normal italic sm:h-4">
              {state.reactMessage}
            </div>
          </div>
          <Boundary
            labels={["Counter Component"]}
            color="blue"
            size="default"
            key={state.count}
            animateRerendering={state.animateRerendering}
          >
            <div className="h-[320px] sm:h-[354px]">
              {componentToShow === "codeDisplay" && (
                <motion.div
                  key="codeDisplay"
                  variants={flipVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.5 }}
                >
                  <CodeDisplay
                    code={[
                      codeSnippet_0,
                      codeSnippet_1,
                      codeSnippet_1,
                      codeSnippet_1,
                      codeSnippet_2,
                      codeSnippet_2,
                      codeSnippet_2,
                      codeSnippet_2,
                      codeSnippet_2,
                      codeSnippet_2,
                      codeSnippet_2,
                    ]}
                    pendingHighlighter={pendingHighlighter}
                    onAnimationComplete={handleAnimationComplete}
                  />
                </motion.div>
              )}

              {componentToShow === "buttonDisplay" && (
                <motion.div
                  key="buttonDisplay"
                  variants={flipVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div className="flex flex-col items-center justify-center gap-y-6 p-4 text-black sm:p-24">
                    <div>
                      You clicked{" "}
                      <span
                        className={clsx(
                          "mx-1 text-white rounded-md px-3 py-2",
                          {
                            "animate-[highlight_1s_ease-in-out_1]":
                              state.disabled,
                            "bg-slate-700": state.disabled,
                            "bg-slate-800": !state.disabled,
                          }
                        )}
                      >
                        {state.count}
                      </span>{" "}
                      {state.count === 1 ? "time" : "times"}.
                    </div>
                    <Button
                      onClick={() => {
                        dispatch({ type: "updating" });
                      }}
                      disabled={!state.disabled}
                    >
                      +1
                    </Button>
                    <div className="text-center text-base font-light italic">
                      {state.message}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </Boundary>
        </Boundary>
      </Boundary>
    </>
  );
}
