export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="col-span-4">
      <div className="hidden h-full flex-1 flex-col p-8 md:flex">
        <h2 className="text-2xl font-bold tracking-tight mb-4">
          React Server Components
        </h2>
        {children}
      </div>
    </div>
  );
}
