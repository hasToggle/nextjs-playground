export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="col-span-4">
      <div className="hidden h-full flex-1 flex-col p-8 md:flex">
        <h2 className="mb-4 text-2xl font-bold tracking-tight">
          Data Fetching & Rendering
        </h2>
        {children}
      </div>
    </div>
  );
}
