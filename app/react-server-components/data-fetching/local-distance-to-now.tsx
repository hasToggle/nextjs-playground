"use client";

import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";

export default function LocalDistance({ requestTime }: { requestTime: Date }) {
  const [relativeDate, setRelativeDate] = useState<string>(
    formatDistanceToNow(requestTime, { includeSeconds: true, addSuffix: true }),
  );

  useEffect(() => {
    setRelativeDate(
      formatDistanceToNow(requestTime, {
        includeSeconds: true,
        addSuffix: true,
      }),
    );
  }, [requestTime]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRelativeDate(
        formatDistanceToNow(requestTime, {
          includeSeconds: true,
          addSuffix: true,
        }),
      );
    }, 30000);

    return () => clearInterval(interval);
  }, [requestTime]);

  return <span>{relativeDate}</span>;
}
