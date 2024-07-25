import "server-only";

import { CardContent, CardFooter } from "@/components/ui/card";

import Table from "../table";
import Products from "../products";
import DataFetchingTabs from "../tabs";

import { loader } from "@/lib/fake-db";

export default function SSG() {
  return (
    <DataFetchingTabs>
      <CardContent>
        <Table>
          <GoFetch />
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
        fetchedOn: "At Build Time",
        time: new Date().toISOString(),
        source: "Server",
      }}
      products={products}
    />
  );
}
