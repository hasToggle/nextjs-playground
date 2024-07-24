import "server-only";

import { Suspense } from "react";

import { CardContent, CardFooter } from "@/components/ui/card";

import Table from "../table";
import Products from "../products";
import DataFetchingTabs from "../tabs";

import { products } from "@/lib/data";

export const revalidate = 30;

export default async function ISR() {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return (
    <DataFetchingTabs>
      <CardContent>
        <Suspense fallback={<div>Loading ...</div>}>
          <Table>
            <Products
              fetchDetails={{
                fetchedOn: "On Request",
                time: new Date().toISOString(),
                source: "Server",
              }}
              products={products}
            />
          </Table>
        </Suspense>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>1-10</strong> of <strong>32</strong> products
        </div>
      </CardFooter>
    </DataFetchingTabs>
  );
}
