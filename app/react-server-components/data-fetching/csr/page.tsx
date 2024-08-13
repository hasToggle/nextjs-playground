"use client";

import { useEffect, useState } from "react";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Boundary } from "@/components/ui/boundary";

import { createNumberDispenser } from "@/lib/utils";
import { type Product } from "@/lib/data";

import DataFetchingTabs from "../tabs";
import EmptyRowSkeleton from "../empty-row-skeleton";
import { FetchItemsInParallel } from "../toggles";
import { ProductsTable, Row } from "../table";
import { SourceInfo } from "../source-info";
import { Reload } from "../reload-button";

export default function CSR() {
  const requestTime = new Date();
  return (
    <Card className="mt-6 p-4">
      <DataFetchingTabs>
        <Boundary
          labels={["Client Component"]}
          color="blue"
          animateRerendering={true}
          size="small"
        >
          <SourceInfo
            details={{
              init: "fetch initiated at request time.",
              env: "in your browser.",
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
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/products", { cache: "no-store" });
      const { products } = await response.json();
      setProducts(products);
    }
    fetchData();
  }, []);

  if (products.length === 0) {
    return <EmptyRowSkeleton count={4} />;
  }

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
            source: "on the Client",
          }}
          product={product}
        />
      ))}
    </>
  );
}
