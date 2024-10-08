import "server-only";

import { Suspense } from "react";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import ClientSideBoundary from "./client-side-boundary";

import { getAllProducts } from "@/lib/fake-db";
import { createNumberDispenser } from "@/lib/utils";

import DataFetchingTabs from "../tabs";
import EmptyRowSkeleton from "../empty-row-skeleton";
import { ProductsTable, Row } from "../table";
import { SourceInfo } from "../source-info";
import { Reload } from "../reload-button";

export const revalidate = 30;

export default function ISR() {
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

        <div className="mb-6 mt-3 flex space-x-1">
          <Reload />
        </div>

        <CardContent className="p-0">
          <ClientSideBoundary requestTime={requestTime}>
            <ProductsTable>
              <Suspense fallback={<EmptyRowSkeleton count={4} />}>
                <GoFetch initiatedAt={requestTime} />
              </Suspense>
            </ProductsTable>
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
  const products = await getAllProducts();
  /* get order in which the individual items eventually render */
  const getOrder = createNumberDispenser();
  return (
    <>
      {products.map((product) => (
        <Row
          key={product.id}
          order={getOrder()}
          fetchDetails={{
            fetchedOn: "at request time",
            time: initiatedAt,
            source: "on the Server",
          }}
          product={product}
        />
      ))}
    </>
  );
}
