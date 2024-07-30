"use client";

import { useState, useEffect } from "react";

import useLocalStorage from "use-local-storage";

import { Boundary } from "@/components/ui/boundary";

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
    requestTime.toString()
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
