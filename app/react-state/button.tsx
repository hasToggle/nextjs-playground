import clsx from "clsx";
import { Ping } from "@/components/ui/ping";

export default function Button({
  variant = "default",
  focus = false,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "pink";
  focus?: boolean;
}) {
  return (
    <span className="relative inline-flex">
      <button
        className={clsx(
          "mt-3 inline-flex items-center rounded-md bg-slate-800 px-12 py-2 text-sm font-semibold leading-6 ring-1 ring-slate-200/20 transition duration-150 ease-in-out disabled:cursor-not-allowed disabled:opacity-70",
          {
            "text-blue-400 enabled:hover:text-blue-300 enabled:hover:shadow-[0_0_0.5em_0em_rgba(96,165,250,0.6)]":
              variant === "default",
            "text-pink-500 enabled:hover:text-pink-400 enabled:hover:shadow-[0_0_0.5em_0em_rgba(236,72,153,0.6)]":
              variant === "pink",
          }
        )}
        {...props}
      />
      {focus && <Ping />}
    </span>
  );
}
