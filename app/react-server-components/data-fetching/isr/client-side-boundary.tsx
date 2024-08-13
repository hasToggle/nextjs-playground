"use client";

import { useState, useEffect } from "react";

import useLocalStorage from "use-local-storage";

import { Boundary } from "@/components/ui/boundary";

/**
 * This component is used to detect if the page has been regenerated
 * on the server side, using the timespamp of the original request time
 * and comparing it to the stored time in local storage. If the times
 * don't match, we know that the page has been regenerated and the component
 * will trigger an animation for the re-render.
 */
export default function ClientSideBoundary({
  requestTime,
  children,
}: {
  requestTime: Date;
  children: React.ReactNode;
}) {
  const [isRegenerated, setIsRegenerated] = useState<boolean>(false);
  const [storedTime, setStoredTime] = useLocalStorage<string>(
    "isr",
    requestTime.toString(),
  );

  useEffect(() => {
    if (requestTime.toString() != storedTime) {
      setStoredTime(requestTime.toString());
      setIsRegenerated(true);
    }
  }, [requestTime, isRegenerated, storedTime, setStoredTime]);

  return (
    <Boundary
      labels={["Server Component"]}
      color="violet"
      animateRerendering={isRegenerated}
      size="small"
    >
      {children}
    </Boundary>
  );
}
