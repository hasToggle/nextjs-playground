"use client";

import { useEffect, useState } from "react";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Boundary } from "@/components/ui/boundary";

import { type Product } from "@/lib/data";
import { createNumberDispenser } from "@/lib/utils";

import { ProductsTable, Row } from "../../table";
import DataFetchingTabs from "../../tabs";
import EmptyRow from "../../empty-row-skeleton";
import { SourceInfo } from "../../source-info";
import { Reload } from "../../reload-button";
import { FetchItemsInParallel } from "../../toggles";

export default function CSRInParallel() {
  /*
   * Strictly speaking, the request for data comes a bit further down in the page component,
   * but for the demo it's convenient to snapshot the moment here.
   */
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

        <div className="flex space-x-1 mt-3 mb-6">
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
            To better observe how individual items are streaming in, fetching
            all items can take <strong>up to 10 seconds</strong>.
          </div>
        </CardFooter>
      </DataFetchingTabs>
    </Card>
  );
}

function GoFetch({ initiatedAt }: { initiatedAt: Date }) {
  /* get order in which the individual items eventually render */
  const getOrder = createNumberDispenser();

  return (
    <>
      {Array.from({ length: 4 }, (_, index) => (
        <Item
          key={index}
          id={index + 1}
          initiatedAt={initiatedAt}
          getOrder={getOrder}
        />
      ))}
    </>
  );
}

function Item({
  id,
  initiatedAt,
  getOrder,
}: {
  id: number;
  initiatedAt: Date;
  getOrder: () => number;
}) {
  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/products/${id}`, {
        cache: "no-store",
      });
      const { product } = await response.json();
      setProduct(product);
    }
    fetchData();
  }, [id]);

  if (!product) {
    return <EmptyRow />;
  }

  return (
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
  );
}
