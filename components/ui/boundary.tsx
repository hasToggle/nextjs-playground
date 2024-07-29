import clsx from "clsx";
import React from "react";

const Label = ({
  children,
  animateRerendering,
  color,
}: {
  children: React.ReactNode;
  animateRerendering?: boolean;
  color?: "default" | "pink" | "blue" | "violet" | "cyan" | "orange";
}) => {
  return (
    <div
      className={clsx("rounded-full py-1 px-4 shadow-[0_0_1px_2px_black]", {
        "bg-gray-800 text-gray-300": color === "default",
        "bg-hastoggle-pink text-pink-50": color === "pink",
        "bg-hastoggle-blue text-white": color === "blue",
        "bg-hastoggle-cyan text-cyan-50": color === "cyan",
        "bg-hastoggle-violet text-violet-50": color === "violet",
        "bg-hastoggle-orange text-orange-50": color === "orange",
        "animate-[highlight_1s_ease-in-out_1]": animateRerendering,
      })}
    >
      {children}
    </div>
  );
};
export const Boundary = ({
  children,
  labels = ["children"],
  size = "default",
  color = "default",
  animateRerendering = true,
}: {
  children: React.ReactNode;
  labels?: string[];
  size?: "small" | "default";
  color?: "default" | "pink" | "blue" | "violet" | "cyan" | "orange";
  animateRerendering?: boolean;
}) => {
  return (
    <div
      className={clsx("relative rounded-xl border border-dashed", {
        "p-5": size === "small",
        "p-10": size === "default",
        "border-gray-700": color === "default",
        "border-hastoggle-pink": color === "pink",
        "border-hastoggle-blue": color === "blue",
        "border-hastoggle-cyan": color === "cyan",
        "border-hastoggle-violet": color === "violet",
        "border-hastoggle-orange": color === "orange",
        "animate-[rerender_1s_ease-in-out_1]": animateRerendering,
      })}
    >
      <div
        className={clsx(
          "absolute -top-3 flex space-x-1 text-[9px] uppercase leading-4 tracking-widest",
          {
            "left-5": size === "small",
            "left-7": size === "default",
          }
        )}
      >
        {labels.map((label) => {
          return (
            <Label
              key={label}
              color={color}
              animateRerendering={animateRerendering}
            >
              {label}
            </Label>
          );
        })}
      </div>

      {children}
    </div>
  );
};
