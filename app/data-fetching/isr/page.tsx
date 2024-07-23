import { Suspense } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import Table from "../table";
import Products from "../products";
import DataFetchingTabs from "../tabs";

import { products } from "@/lib/data";

export const revalidate = 30;

export default async function ISR() {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return (
    <Card className="relative border-sky-200">
      <Badge
        className="absolute left-3 -top-3 bg-white border-sky-200"
        variant="outline"
      >
        Server Component (region US1)
      </Badge>
      <CardHeader>
        <CardTitle>Products</CardTitle>
        <CardDescription>
          Fetch initiated at request time in your serverless functions
          environment.
          <br />
          Fetch resolved at request time in your serverless functions
          environment.
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
