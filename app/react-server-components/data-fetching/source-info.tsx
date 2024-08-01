import { CalendarIcon, CodeIcon, ClockIcon } from "@radix-ui/react-icons";

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

      <div className="mt-2 flex items-center text-base">
        <CalendarIcon className="mr-2 h-4 w-4" />
        <span suppressHydrationWarning>
          <LocalDistance requestTime={requestTime} /> ({timeWithSeconds}).
        </span>
      </div>
    </>
  );
}
