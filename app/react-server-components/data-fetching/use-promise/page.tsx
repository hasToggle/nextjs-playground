import "server-only";

import { Suspense } from "react";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Boundary } from "@/components/ui/boundary";

import { getAllProducts } from "@/lib/fake-db";

import ClientComponent from "./client-use-promise";
import EmptyRowSkeleton from "../empty-row-skeleton";
import DataFetchingTabs from "../tabs";
import { FetchItemsInParallel } from "../toggles";
import { ProductsTable } from "../table";
import { SourceInfo } from "../source-info";
import { Reload } from "../reload-button";

export const dynamic = "force-dynamic";

export default function UsePromise() {
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

        <div className="mb-6 mt-3 flex space-x-1">
          <Reload />
          <FetchItemsInParallel />
        </div>

        <CardContent className="p-0">
          <Boundary
            labels={["Client Component"]}
            color="blue"
            animateRerendering={true}
            size="small"
          >
            <ProductsTable>
              <GoFetch initiatedAt={requestTime} />
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

function GoFetch({ initiatedAt }: { initiatedAt: Date }) {
  const products = getAllProducts();

  return (
    <Suspense fallback={<EmptyRowSkeleton count={4} />}>
      <ClientComponent
        fetchDetails={{
          fetchedOn: "at request time",
          time: initiatedAt,
          source: "on the Client",
        }}
        products={products}
      />
    </Suspense>
  );
}
