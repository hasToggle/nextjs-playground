import "server-only";

import { Suspense } from "react";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Boundary } from "@/components/ui/boundary";

import { FetchItemsInParallel } from "../../toggles";
import { Reload } from "../../reload-button";
import DataFetchingTabs from "../../tabs";
import { SourceInfo } from "../../source-info";
import { ProductsTable, Row } from "../../table";
import EmptyRow from "../../empty-row-skeleton";

import { getProductIds, getProduct } from "@/lib/fake-db";
import { createNumberDispenser } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default function SSRInParallel() {
  /*
   * Strictly speaking, the request for data comes a bit further down in the page component,
   * but for the demo it's convenient to snapshot the moment here.
   */
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
              <GoFetch initiatedAt={requestTime} />
            </ProductsTable>
          </Boundary>
        </CardContent>
        <CardFooter className="mt-3">
          <div className="text-xs text-muted-foreground">
            To better observe how individual items are streaming in, fetching
            all items can take <strong>up to 10 seconds</strong>.
          </div>
        </CardFooter>
      </DataFetchingTabs>
    </Card>
  );
}

function GoFetch({ initiatedAt }: { initiatedAt: Date }) {
  const products = getProductIds();
  const getOrder = createNumberDispenser();

  return (
    <>
      {products.map((product) => (
        <Suspense key={product.id} fallback={<EmptyRow />}>
          <Item
            id={product.id}
            onResolved={getOrder}
            fetchDetails={{
              fetchedOn: "at request time",
              source: "on the Server",
              time: initiatedAt,
            }}
          />
        </Suspense>
      ))}
    </>
  );
}

async function Item({
  id,
  onResolved,
  fetchDetails,
}: {
  id: number;
  onResolved: () => number;
  fetchDetails: {
    fetchedOn: string;
    source: string;
    time: Date;
  };
}) {
  const product = await getProduct(id);

  if (!product) return null;

  const order = onResolved();

  return <Row product={product} order={order} fetchDetails={fetchDetails} />;
}
