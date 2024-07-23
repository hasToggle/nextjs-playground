/* import { Suspense } from "react"; */

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

import Table from "../table";
import Products from "../products";
import DataFetchingTabs from "../tabs";
import EmptyRow from "../empty-row-skeleton";

import { loader } from "@/lib/fake-db";

export const dynamic = "force-dynamic";

export default function SSR() {
  const skeleton = Array.from({ length: 4 }, (_, index) => (
    <EmptyRow key={index} />
  ));

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
          Fetch initiated at request time in your serverless functions
          environment.
          <br />
          Fetch resolved at request time in your serverless functions
          environment.
        </CardDescription>
      </CardHeader>
      <DataFetchingTabs>
        <CardContent>
          <Table>
            {/*  <Suspense fallback={<TableBody>{skeleton}</TableBody>}> */}
            <GoFetch />
            {/* </Suspense> */}
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
