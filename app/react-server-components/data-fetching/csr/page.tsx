"use client";

import { useEffect, useState } from "react";

import { CardContent, CardFooter } from "@/components/ui/card";

import { TableBody } from "@/components/ui/table";

import { type Product } from "@/lib/data";

import Table from "../table";
import Products from "../products";
import DataFetchingTabs from "../tabs";
import EmptyRow from "../empty-row-skeleton";

export default function CSR() {
  const [products, setProducts] = useState<Product[] | []>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/products");
      const { products } = await response.json();
      setProducts(products);
    }
    fetchData();
  }, []);

  if (!products.length) {
    const skeleton = Array.from({ length: 4 }, (_, index) => (
      <EmptyRow key={index} />
    ));

    return (
      <DataFetchingTabs>
        <CardContent>
          <Table>
            <TableBody>{skeleton}</TableBody>
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

  return (
    <DataFetchingTabs>
      <CardContent>
        <Table>
          <Products
            fetchDetails={{
              fetchedOn: "On Request",
              time: new Date().toISOString(),
              source: "Client",
            }}
            products={products}
          />
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
