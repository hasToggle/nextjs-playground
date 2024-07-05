"use client";

import { useState } from "react";

export default function ClientWrapper({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="text-black">
      <h2>Client Wrapper</h2>
      <p>Your children:</p>
      <button onClick={() => setShow(!show)}>Toggle</button>
      {show && <div>{children}</div>}
    </div>
  );
}
