import "server-only";

/* import { Suspense } from "react"; */

import { CardContent, CardFooter } from "@/components/ui/card";
/* import { TableBody } from "@/components/ui/table"; */

import Table from "../table";
import Products from "../products";
import DataFetchingTabs from "../tabs";
/* import EmptyRow from "../empty-row-skeleton"; */

import { loader } from "@/lib/fake-db";

export const dynamic = "force-dynamic";

export default function SSR() {
  /* const skeleton = Array.from({ length: 4 }, (_, index) => (
    <EmptyRow key={index} />
  )); */

  return (
    <DataFetchingTabs>
      <CardContent>
        <Table>
          {/* <Suspense fallback={<TableBody>{skeleton}</TableBody>}> */}
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
  );
}

async function GoFetch() {
  /* fake a delay of 3 seconds */
  const products = await loader();
  return (
    <Products
      fetchDetails={{
        fetchedOn: "On Request",
        time: new Date().toISOString(),
        source: "Server",
      }}
      products={products}
    />
  );
}
