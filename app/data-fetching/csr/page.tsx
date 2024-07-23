"use client";

import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
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
      <Card className="relative border-orange-200">
        <Badge
          className="absolute left-3 -top-3 bg-white border-orange-200"
          variant="outline"
        >
          Client Component
        </Badge>
        <CardHeader>
          <CardTitle>Products</CardTitle>
          <CardDescription>
            Fetch initiated at request time in your browser.
            <br />
            Fetch resolved at request time in your browser.
          </CardDescription>
        </CardHeader>
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
      </Card>
    );
  }

  return (
    <Card className="relative border-orange-200">
      <Badge
        className="absolute left-3 -top-3 bg-white border-orange-200"
        variant="outline"
      >
        Client Component
      </Badge>
      <CardHeader>
        <CardTitle>Products</CardTitle>
        <CardDescription>
          Fetch initiated at request time in your browser.
          <br />
          Fetch resolved at request time in your browser.
        </CardDescription>
      </CardHeader>
      <DataFetchingTabs>
        <CardContent>
          <Table>
            <Products products={products} />
          </Table>
        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Showing <strong>1-10</strong> of <strong>32</strong> products
          </div>
        </CardFooter>
      </DataFetchingTabs>
    </Card>
  );
}
