import "server-only";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="h-28">
        <div className="px-4 py-3 my-auto border rounded-lg">
          <div>
            Products are initiated as a Promise at request time on the server
            (without awaiting it) and forwarded to the client.
          </div>
          <div>
            Client Components cannot be asynchronous, so how do they resolve the
            Promise?
          </div>
          <div>
            That is where the new use-API comes in. Just like an async Server
            Component, you can suspend a synchronous Client Component by calling
            "use" which is going to wait for the Promise to resolve. While the
            Promise is pending, the Suspense boundary will display the fallback.
          </div>
        </div>
      </div>

      {children}
    </>
  );
}
