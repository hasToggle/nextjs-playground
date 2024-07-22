export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="col-span-4">
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Server-side Rendering
            </h2>
            <p className="text-muted-foreground">
              Cached products are fetched at build time and are static. Dynamic
              products are fetched on each request.
            </p>
            <p className="text-muted-foreground">
              Where and when do you initiate fetching data and where do you
              display it?
            </p>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
