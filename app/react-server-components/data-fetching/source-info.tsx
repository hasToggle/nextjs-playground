import { CalendarIcon, CodeIcon, ClockIcon } from "@radix-ui/react-icons";
import clsx from "clsx";
import { format, formatDistanceToNow } from "date-fns";

import { Badge } from "@/components/ui/badge";

export function SourceInfo({
  details,
}: {
  details: { init: string; env: string; requestTime: Date };
}) {
  const { init, env, requestTime } = details;

  const relativeDate = formatDistanceToNow(requestTime, { addSuffix: true });
  const timeWithSeconds = format(requestTime, "HH:mm:ss");

  return (
    <>
      <span className="flex items-center text-base">
        <ClockIcon className="mr-2 h-4 w-4" />
        {init}
      </span>

      <span className="mt-2 flex items-center text-base">
        <CodeIcon className="mr-2 h-4 w-4" />
        {env}
      </span>

      <span
        className="mt-2 flex items-center text-base"
        suppressHydrationWarning
      >
        <CalendarIcon className="mr-2 h-4 w-4" />
        {`${relativeDate} (${timeWithSeconds})`}.
      </span>
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
