"use client";

import { useRouter, usePathname } from "next/navigation";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

/* add
  - border indicating server/client component
  - info about where & when fetching starts and where and when data is rendered
*/

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
            <p className="text-muted-foreground">
              Where and when do you initiate fetching data and where do you
              display it?
            </p>
          </div>
        </div>

        <Tabs value={pathname.split("/")[2]} className="h-full space-y-6">
          <div className="space-between flex items-center">
            <TabsList>
              <TabsTrigger
                onClick={() => router.push("/data-fetching/ssg")}
                value="ssg"
                className="relative"
              >
                SSG
              </TabsTrigger>
              <TabsTrigger
                onClick={() => router.push("/data-fetching/ssr")}
                value="ssr"
              >
                SSR
              </TabsTrigger>
              <TabsTrigger
                onClick={() => router.push("/data-fetching/isr")}
                value="isr"
              >
                ISR
              </TabsTrigger>
              <TabsTrigger
                onClick={() => router.push("/data-fetching/csr")}
                value="csr"
              >
                CSR
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="ssg" className="border-none p-0 outline-none">
            {children}
          </TabsContent>
          <TabsContent
            value="ssr"
            className="h-full flex-col border-none p-0 data-[state=active]:flex"
          >
            {children}
          </TabsContent>
          <TabsContent
            value="isr"
            className="h-full flex-col border-none p-0 data-[state=active]:flex"
          >
            {children}
          </TabsContent>
          <TabsContent
            value="csr"
            className="h-full flex-col border-none p-0 data-[state=active]:flex"
          >
            {children}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
