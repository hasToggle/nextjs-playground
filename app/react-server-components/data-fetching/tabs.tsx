"use client";

import { useRouter, usePathname } from "next/navigation";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DataFetchingTabs({
  children,
}: {
  children?: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Tabs
      value={pathname.split("/")[3] || "default"}
      className="space-y-6 pb-6 pt-0"
    >
      <div className="space-between flex items-center">
        <TabsList>
          <TabsTrigger
            onClick={() =>
              router.push("/react-server-components/data-fetching")
            }
            value="default"
          >
            <span className="mr-1">Choose</span>{" "}
            <span aria-hidden="true">&rarr;</span>
          </TabsTrigger>
          <TabsTrigger
            onClick={() =>
              router.push("/react-server-components/data-fetching/ssg")
            }
            value="ssg"
            className="relative"
          >
            SSG
          </TabsTrigger>
          <TabsTrigger
            onClick={() =>
              router.push("/react-server-components/data-fetching/isr")
            }
            value="isr"
          >
            ISR
          </TabsTrigger>
          <TabsTrigger
            onClick={() =>
              router.push("/react-server-components/data-fetching/ssr")
            }
            value="ssr"
          >
            SSR
          </TabsTrigger>
          <TabsTrigger
            onClick={() =>
              router.push("/react-server-components/data-fetching/use-promise")
            }
            value="use-promise"
          >
            use API
          </TabsTrigger>
          <TabsTrigger
            onClick={() =>
              router.push("/react-server-components/data-fetching/csr")
            }
            value="csr"
          >
            CSR
          </TabsTrigger>
        </TabsList>
      </div>
      <TabsContent
        value="default"
        className="h-full flex-col border-none p-0 data-[state=active]:flex"
      >
        {children}
      </TabsContent>
      <TabsContent
        value="ssg"
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
        value="ssr"
        className="h-full flex-col border-none p-0 data-[state=active]:flex"
      >
        {children}
      </TabsContent>
      <TabsContent
        value="use-promise"
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
  );
}
