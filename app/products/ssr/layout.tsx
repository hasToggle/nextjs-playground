"use client";

import { useRouter, usePathname } from "next/navigation";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

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
          </div>
        </div>

        <Tabs
          defaultValue={pathname.split("/")[3]}
          className="h-full space-y-6"
        >
          <div className="space-between flex items-center">
            <TabsList>
              <TabsTrigger
                onClick={() => router.push("/products/ssr/cached")}
                value="cached"
                className="relative"
              >
                Cached
              </TabsTrigger>
              <TabsTrigger
                onClick={() => router.push("/products/ssr/dynamic")}
                value="dynamic"
              >
                Dynamic
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="cached" className="border-none p-0 outline-none">
            {children}
          </TabsContent>
          <TabsContent
            value="dynamic"
            className="h-full flex-col border-none p-0 data-[state=active]:flex"
          >
            {children}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
