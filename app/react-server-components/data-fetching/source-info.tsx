import { CalendarIcon, CodeIcon, ClockIcon } from "@radix-ui/react-icons";

import { Badge } from "@/components/ui/badge";

export default function SourceInfo({
  details,
}: {
  details: { type: string; init: string; env: string; requestTime: string };
}) {
  const { type, init, env, requestTime } = details;
  return (
    <div className="relative mt-4 mb-2 px-4 py-5 border border-purple-300 rounded-md">
      <Badge
        className="absolute left-3 -top-3 bg-white border-purple-300"
        variant="outline"
      >
        {type}
      </Badge>

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
        At {requestTime}.
      </span>
    </div>
  );
}
