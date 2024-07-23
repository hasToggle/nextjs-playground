"use client";

import { useEffect, useState, Suspense } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { type Product } from "@/lib/data";

import Table from "../table";
import Products from "../products";
import DataFetchingTabs from "../tabs";

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
          <Suspense fallback={<div>Loading ...</div>}>
            <Table>
              <Products products={products} />
            </Table>
          </Suspense>
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
