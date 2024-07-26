import "server-only";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="h-28">
        <div className="px-4 py-3 my-auto border rounded-lg">
          <div>
            Products are static for 30 seconds. If a request is made within 30
            seconds, the cached HTML is served from a CDN. After 30 seconds, the
            cache is invalidated, and the next request will trigger a rebuild of
            the page in the background but still serve the stale HTML in the
            meantime. Refresh the page once more to see the new content.
          </div>
        </div>
      </div>

      {children}
    </>
  );
}
