import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Table from "../table";
import Products from "../products";
import { Suspense } from "react";

export default async function SSR() {
  /* fake a delay of 3 seconds */
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return (
    <Card>
      <CardHeader>
        <CardTitle>Products</CardTitle>
        <CardDescription>
          Manage your products and view their sales performance.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<div>Loading ...</div>}>
          <Table>
            <Products />
          </Table>
        </Suspense>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>1-10</strong> of <strong>32</strong> products
        </div>
      </CardFooter>
    </Card>
  );
}
