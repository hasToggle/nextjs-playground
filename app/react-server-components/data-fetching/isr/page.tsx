import "server-only";

import { Suspense } from "react";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { TableBody } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

import Table from "../table";
import Products from "../products";
import DataFetchingTabs from "../tabs";
import EmptyRow from "../empty-row-skeleton";
import SourceInfo from "../source-info";
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
  const requestTime = new Date().toISOString();
  return (
    <Card className="mt-6 p-4">
      <DataFetchingTabs>
        <SourceInfo
          details={{
            type: "Server Component",
            init: "Fetch initiated at request time.",
            env: "In your serverless functions environment.",
            requestTime,
          }}
        />

        <div className="flex space-x-1 mb-5">
          <Reload />
        </div>

        <CardContent className="p-0">
          <div className="relative p-1 rounded-md border border-purple-300">
            <Badge
              className="absolute left-3 -top-3 bg-white border-purple-300"
              variant="outline"
            >
              Server Component
            </Badge>

            <Table>
              <Suspense fallback={<TableBody>{skeleton}</TableBody>}>
                <GoFetch />
              </Suspense>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="mt-3">
          <div className="text-xs text-muted-foreground">
            Showing <strong>1-4</strong> of <strong>4</strong> products
          </div>
        </CardFooter>
      </DataFetchingTabs>
    </Card>
  );
}

async function GoFetch() {
  /* fake a delay of 3 seconds */
  const products = await loader();
  return (
    <Products
      fetchDetails={{
        fetchedOn: "at request time",
        time: new Date().toISOString(),
        source: "on the Server",
      }}
      products={products}
    />
  );
}
