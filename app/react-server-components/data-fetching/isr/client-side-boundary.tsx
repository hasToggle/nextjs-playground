"use client";

import { useState, useEffect, useRef } from "react";
import { getTime } from "date-fns";

import { Boundary } from "@/components/ui/boundary";

export default function ClientSideBoundary({
  requestTime,
  children,
}: {
  requestTime: Date;
  children: React.ReactNode;
}) {
  /* const [isRegenerated, setIsRegenerated] = useState<boolean>(false);
  const firstTimeExceeded = useRef<boolean>(false);

  const serverTime = getTime(requestTime);
  const clientTime = getTime(new Date());
  const didExceed = clientTime - serverTime > 33200;

  useEffect(() => {
    if (didExceed) {
      if (firstTimeExceeded.current) {
        setIsRegenerated(true);
        firstTimeExceeded.current = false;
      } else {
        firstTimeExceeded.current = true;
      }
    } else {
      setIsRegenerated(false);
      firstTimeExceeded.current = false;
    }
  }, [didExceed]); */

  return (
    <Boundary
      labels={["Server Component"]}
      color="violet"
      animateRerendering={true}
      size="small"
    >
      {children}
    </Boundary>
  );
}
