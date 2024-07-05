"use client";

import { use, useState } from "react";

export default function ClientComponent({
  /* if some props can't be serialized, why not make the linter scream at us here? => Because you can wrap this component within another client component and pass props then */
  children,
}: {
  children?: React.ReactNode;
}) {
  const [count, setCount] = useState(0);
  return (
    <>
      <h2>Client Component</h2>
      <button
        className="px-8 py-2 bg-gray-600 rounded-md"
        onClick={() => setCount(count + 1)}
      >
        {count}
      </button>
      <p>Your children:</p>
      <div>{children}</div>
    </>
  );
}

export function ClientUsePromise({
  messagePromise,
}: {
  messagePromise: Promise<string>;
}) {
  const messageContent = use(messagePromise);
  return (
    <>
      <p>Here is the message: {messageContent}</p>
    </>
  );
}
