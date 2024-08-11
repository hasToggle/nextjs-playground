import "server-only";

import { Suspense } from "react";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Boundary } from "@/components/ui/boundary";

import { getAllProducts } from "@/lib/fake-db";
import { createNumberDispenser } from "@/lib/utils";

import DataFetchingTabs from "../tabs";
import EmptyRowSkeleton from "../empty-row-skeleton";
import { FetchItemsInParallel } from "../toggles";
import { ProductsTable, Row } from "../table";
import { SourceInfo } from "../source-info";
import { Reload } from "../reload-button";

export const dynamic = "force-dynamic";

export default function SSR() {
  const requestTime = new Date();
  return (
    <Card className="mt-6 p-4">
      <DataFetchingTabs>
        <Boundary
          labels={["Server Component"]}
          color="violet"
          animateRerendering={true}
          size="small"
        >
          <SourceInfo
            details={{
              init: "fetch initiated at request time.",
              env: "in your serverless functions environment.",
              requestTime,
            }}
          />
        </Boundary>

        <div className="flex space-x-1 mt-3 mb-6">
          <Reload />
          <FetchItemsInParallel />
        </div>

        <CardContent className="p-0">
          <Boundary
            labels={["Server Component"]}
            color="violet"
            animateRerendering={true}
            size="small"
          >
            <ProductsTable>
              <Suspense fallback={<EmptyRowSkeleton count={4} />}>
                <GoFetch initiatedAt={requestTime} />
              </Suspense>
            </ProductsTable>
          </Boundary>
        </CardContent>
        <CardFooter className="mt-3">
          <div className="text-xs text-muted-foreground">
            Fetching all items incurs a deliberate{" "}
            <strong>3 second delay</strong>.
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
