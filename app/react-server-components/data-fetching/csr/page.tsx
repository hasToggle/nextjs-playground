"use client";

import { useEffect, useState } from "react";
import { CalendarIcon, CodeIcon, ClockIcon } from "@radix-ui/react-icons";

import { Card, CardContent, CardFooter } from "@/components/ui/card";

import { TableBody } from "@/components/ui/table";

import { type Product } from "@/lib/data";

import Table from "../table";
import Products from "../products";
import DataFetchingTabs from "../tabs";
import EmptyRow from "../empty-row-skeleton";

export default function CSR() {
  /*
   * Strictly speaking, the request for data comes a bit further down in the page component,
   * but for the demo it's convenient to snapshot the moment here.
   */
  const requestTime = new Date().toISOString();

  return (
    <DataFetchingTabs>
      <Card className="mb-3 p-4">
        <span className="flex items-center text-base">
          <ClockIcon className="mr-2 h-4 w-4" />
          Fetch initiated at request time.
        </span>
        <span className="mt-2 flex items-center text-base">
          <CodeIcon className="mr-2 h-4 w-4" />
          In your browser.
        </span>
        <span
          className="mt-2 flex items-center text-base"
          suppressHydrationWarning
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          At {requestTime}.
        </span>
      </Card>
      <CardContent>
        <Table>
          <GoFetch />
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>1-10</strong> of <strong>32</strong> products
        </div>
      </CardFooter>
    </DataFetchingTabs>
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
