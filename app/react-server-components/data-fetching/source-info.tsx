import { CalendarIcon, CodeIcon, ClockIcon } from "@radix-ui/react-icons";
import clsx from "clsx";

import { Badge } from "@/components/ui/badge";
import LocalDistance from "./local-distance-to-now";

export function SourceInfo({
  details,
}: {
  details: { init: string; env: string; requestTime: Date };
}) {
  const { init, env, requestTime } = details;

  const timeWithSeconds = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZoneName: "short",
  }).format(requestTime);

  return (
    <>
      <div className="flex items-center text-base">
        <ClockIcon className="mr-2 h-4 w-4" />
        {init}
      </div>

      <div className="mt-2 flex items-center text-base">
        <CodeIcon className="mr-2 h-4 w-4" />
        {env}
      </div>

      <div
        className="mt-2 flex items-center text-base"
        suppressHydrationWarning
      >
        <CalendarIcon className="mr-2 h-4 w-4" />
        <span>
          <LocalDistance requestTime={requestTime} /> ({timeWithSeconds}).
        </span>
      </div>
    </>
  );
}

export function Boundary({
  variant,
  children,
}: {
  variant: "server" | "client";
  children: React.ReactNode;
}) {
  return (
    <div
      className={clsx("relative mt-4 mb-2 px-4 py-5 border rounded-md", {
        "border-purple-300": variant === "server",
        "border-blue-300": variant === "client",
      })}
    >
      <Badge
        className={clsx("absolute capitalize left-3 -top-3 bg-white", {
          "border-purple-300": variant === "server",
          "border-blue-300": variant === "client",
        })}
        variant="outline"
      >
        {variant} Component
      </Badge>

      {children}
    </div>
  );
}
