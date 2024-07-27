"use client";

import { formatDistanceToNow } from "date-fns";

export default function LocalDistance({ requestTime }: { requestTime: Date }) {
  const relativeDate = formatDistanceToNow(requestTime, { addSuffix: true });
  return <>{relativeDate}</>;
}
