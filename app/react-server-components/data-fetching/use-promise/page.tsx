import "server-only";

import { Suspense } from "react";
import { CalendarIcon, CodeIcon, ClockIcon } from "@radix-ui/react-icons";

import { Card, CardContent, CardFooter } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { TableBody } from "@/components/ui/table";

import Table from "../table";
import DataFetchingTabs from "../tabs";
import EmptyRow from "../empty-row-skeleton";

import { getAllProducts } from "@/lib/fake-db";

import ClientComponent from "./client-use-promise";

export const dynamic = "force-dynamic";

export default function UsePromise() {
  /*
   * Strictly speaking, the request for data comes a bit further down in the page component,
   * but for the demo it's convenient to snapshot the moment here.
   */
  const requestTime = new Date().toISOString();
  return (
    <DataFetchingTabs>
      <Card className="mb-3 p-4">
        <span className="flex items-center text-base">
          <ClockIcon className="mr-2 h-4 w-4" />
          Fetch initiated at request time.
        </span>
        <span className="mt-2 flex items-center text-base">
          <CodeIcon className="mr-2 h-4 w-4" />
          In your serverless functions environment.
        </span>
        <span
          className="mt-2 flex items-center text-base"
          suppressHydrationWarning
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          At {requestTime}.
        </span>
      </Card>
      <CardContent>
        <Card className="relative border-orange-200">
          <Badge
            className="absolute left-3 -top-3 bg-white border-orange-200"
            variant="outline"
          >
            Client Component
          </Badge>
          <Table>
            <GoFetch />
          </Table>
        </Card>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>1-10</strong> of <strong>32</strong> products
        </div>
      </CardFooter>
    </DataFetchingTabs>
  );
}

function GoFetch() {
  const products = getAllProducts();

  const skeleton = Array.from({ length: 4 }, (_, index) => (
    <EmptyRow key={index} />
  ));

  return (
    <Suspense fallback={<TableBody>{skeleton}</TableBody>}>
      <ClientComponent
        fetchDetails={{
          fetchedOn: "at request time",
          time: new Date().toISOString(),
          source: "on the Client",
        }}
        products={products}
      />
    </Suspense>
  );
}
