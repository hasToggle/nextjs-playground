export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="col-span-4">
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              React Server Components
            </h2>
            <p className="text-muted-foreground">
              When using the App Router in Next, you are automatically opted
              into using React Server Components. By default, every component is
              a Server Component.
            </p>
            <p className="text-muted-foreground">
              To better understand the Server/Client Component model, see the
              demo below.
            </p>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
