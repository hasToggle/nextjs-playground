import "server-only";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Boundary } from "@/components/ui/boundary";

import { createNumberDispenser } from "@/lib/utils";
import { getAllProducts } from "@/lib/fake-db";

import DataFetchingTabs from "../tabs";
import { ProductsTable, Row } from "../table";
import { SourceInfo } from "../source-info";
import { Reload } from "../reload-button";

export default function SSG() {
  const requestTime = new Date();
  return (
    <Card className="mt-6 p-4">
      <DataFetchingTabs>
        <Boundary
          labels={["Server Component"]}
          color="violet"
          animateRerendering={false}
          size="small"
        >
          <SourceInfo
            details={{
              init: "Fetch initiated at build time.",
              env: "in your serverless functions environment.",
              requestTime,
            }}
          />
        </Boundary>

        <div className="flex space-x-1 mt-3 mb-6">
          <Reload />
        </div>

        <CardContent className="p-0">
          <Boundary
            labels={["Server Component"]}
            color="violet"
            animateRerendering={false}
            size="small"
          >
            <ProductsTable>
              <GoFetch initiatedAt={requestTime} />
            </ProductsTable>
          </Boundary>
        </CardContent>
        <CardFooter className="mt-3">
          <div className="text-xs text-muted-foreground">
            All items remain{" "}
            <strong>static for the lifetime of a deployment.</strong> The
            initial delay of 3 seconds happens at build time and is never
            experienced by the user.
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
          product={product}
          order={getOrder()}
          fetchDetails={{
            fetchedOn: "at build time",
            time: initiatedAt,
            source: "on the Server",
          }}
        />
      ))}
    </>
  );
}
