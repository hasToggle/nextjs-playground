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
import { Suspense } from "react";

export default async function SSG() {
  /* fake a delay of 3 seconds */
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
          Fetch initiated at build time in your serverless functions environment
          <br />
          Fetch resolved at build time in your serverless functions environment
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
