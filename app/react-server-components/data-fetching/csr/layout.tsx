import "server-only";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="h-28">
        <div className="px-4 py-3 my-auto border rounded-lg">
          <div>
            Products are fetched on the client using useEffect and useState.
            This is the classic client side rendering (CSR) approach. For
            simplicity, the demo does not make use of any libraries like SWR or
            React Query. For production, you should consider using any one of
            the available options.
          </div>
        </div>
      </div>

      {children}
    </>
  );
}
