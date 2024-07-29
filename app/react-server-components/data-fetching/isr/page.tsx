import "server-only";

import { Suspense } from "react";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { TableBody } from "@/components/ui/table";
import ClientSideBoundary from "./client-side-boundary";

import Table from "../table";
import Products from "../products";
import DataFetchingTabs from "../tabs";
import EmptyRow from "../empty-row-skeleton";
import { SourceInfo } from "../source-info";
import { Reload } from "../reload-button";

import { loader } from "@/lib/fake-db";

export const revalidate = 30;

export default function ISR() {
  const skeleton = Array.from({ length: 4 }, (_, index) => (
    <EmptyRow key={index} />
  ));
  /*
   * Strictly speaking, the request for data comes a bit further down in the page component,
   * but for the demo it's convenient to snapshot the moment here.
   */
  const requestTime = new Date();
  return (
    <Card className="mt-6 p-4">
      <DataFetchingTabs>
        <ClientSideBoundary requestTime={requestTime}>
          <SourceInfo
            details={{
              init: "fetch initiated at request time.",
              env: "in your serverless functions environment.",
              requestTime,
            }}
          />
        </ClientSideBoundary>

        <div className="flex space-x-1 mt-3 mb-5">
          <Reload />
        </div>

        <CardContent className="p-0">
          <ClientSideBoundary requestTime={requestTime}>
            <Table>
              <Suspense fallback={<TableBody>{skeleton}</TableBody>}>
                <GoFetch initiatedAt={requestTime} />
              </Suspense>
            </Table>
          </ClientSideBoundary>
        </CardContent>
        <CardFooter className="mt-3">
          <div className="text-xs text-muted-foreground">
            All items are <strong>static for 30 seconds.</strong> Refreshing the
            page after that triggers a delay of 3 seconds in the background.
            Refreshing the page after another 3 seconds fetches the updated
            list.
          </div>
        </CardFooter>
      </DataFetchingTabs>
    </Card>
  );
}

async function GoFetch({ initiatedAt }: { initiatedAt: Date }) {
  /* fake a delay of 3 seconds */
  const products = await loader();
  return (
    <Products
      fetchDetails={{
        fetchedOn: "at request time",
        time: initiatedAt,
        source: "on the Server",
      }}
      products={products}
    />
  );
}
