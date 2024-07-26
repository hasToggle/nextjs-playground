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
import SourceInfo from "../source-info";
import { Reload } from "../reload-button";

export default function CSR() {
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
            type: "Client Component",
            init: "Fetch initiated at request time.",
            env: "In your browser.",
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
              Client Component
            </Badge>

            <Table>
              <GoFetch />
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

function GoFetch() {
  const [products, setProducts] = useState<Product[] | []>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/products");
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
        time: new Date().toISOString(),
        source: "on the Client",
      }}
      products={products}
    />
  );
}
