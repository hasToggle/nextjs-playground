"use client";

import { useEffect, useState } from "react";

import { Card, CardContent, CardFooter } from "@/components/ui/card";

import { TableBody } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

import { type Product } from "@/lib/data";

import Table from "../table";
import Products from "../products";
import DataFetchingTabs from "../tabs";
import EmptyRow from "../empty-row-skeleton";
import { SourceInfo, Boundary } from "../source-info";
import { Reload } from "../reload-button";

export default function CSR() {
  /*
   * Strictly speaking, the request for data comes a bit further down in the page component,
   * but for the demo it's convenient to snapshot the moment here.
   */
  const requestTime = new Date();

  return (
    <Card className="mt-6 p-4">
      <DataFetchingTabs>
        <Boundary variant="client" label="Client Component">
          <SourceInfo
            details={{
              init: "fetch initiated at request time.",
              env: "in your browser.",
              requestTime,
            }}
          />
        </Boundary>

        <div className="flex space-x-1 mb-5">
          <Reload />
        </div>

        <CardContent className="p-0">
          <div className="relative p-1 rounded-md border border-blue-300">
            <Badge
              className="absolute left-3 -top-3 bg-white border-blue-300"
              variant="outline"
            >
              Client Component
            </Badge>

            <Table>
              <GoFetch initiatedAt={requestTime} />
            </Table>
          </div>
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

function GoFetch({ initiatedAt: initiated }: { initiatedAt: Date }) {
  const [products, setProducts] = useState<Product[] | []>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/products", { cache: "no-store" });
      const { products } = await response.json();
      setProducts(products);
    }
    fetchData();
  }, []);

  if (products.length === 0) {
    const skeleton = Array.from({ length: 4 }, (_, index) => (
      <EmptyRow key={index} />
    ));
    return <TableBody>{skeleton}</TableBody>;
  }

  return (
    <Products
      fetchDetails={{
        fetchedOn: "at request time",
        time: initiated,
        source: "on the Client",
      }}
      products={products}
    />
  );
}
