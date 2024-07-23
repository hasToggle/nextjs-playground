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
import DataFetchingTabs from "../tabs";
import EmptyRow from "../empty-row-skeleton";

import { getAllProducts } from "@/lib/fake-db";

import ClientComponent from "./client-use-promise";
import ClientWrapper from "./client-wrapper";

export const dynamic = "force-dynamic";

export default function UsePromise() {
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
          <Card className="relative border-orange-200">
            <Badge
              className="absolute left-3 -top-3 bg-white border-orange-200"
              variant="outline"
            >
              Client Component
            </Badge>
            <Table>
              <GoFetch />
            </Table>
          </Card>
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

function GoFetch() {
  const products = new Promise<Array<any>>((resolve) => {
    setTimeout(() => {
      resolve(getAllProducts());
    }, 3000);
  });

  const skeleton = Array.from({ length: 4 }, (_, index) => (
    <EmptyRow key={index} />
  ));

  return (
    <>
      {/* <Suspense fallback={<TableBody>{skeleton}</TableBody>}> */}
      <ClientComponent products={products} />
      {/* </Suspense> */}
    </>
  );
}
