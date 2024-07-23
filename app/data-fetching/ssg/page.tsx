import "server-only";

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

import { loader } from "@/lib/fake-db";

export const dynamic = "force-static";

export default function SSG() {
  return (
    <Card className="relative border-sky-200">
      <Badge
        className="absolute left-3 -top-3 bg-white border-sky-200"
        variant="outline"
      >
        Server Component
      </Badge>
      <CardHeader>
        <CardTitle>Products</CardTitle>
        <CardDescription>
          Fetch initiated at build time in your serverless functions environment
          <br />
          Fetch resolved at build time in your serverless functions environment
        </CardDescription>
      </CardHeader>
      <DataFetchingTabs>
        <CardContent>
          <Table>
            <Suspense fallback={<div>Loading ...</div>}>
              <GoFetch />
            </Suspense>
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

async function GoFetch() {
  /* fake a delay of 3 seconds */
  const products = await loader();
  return <Products products={products} />;
}
