import "server-only";

import { Suspense } from "react";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { TableBody } from "@/components/ui/table";
import { Boundary } from "@/components/ui/boundary";

import { FetchItemsIndividually } from "../toggles";
import { Reload } from "../reload-button";
import Table from "../table";
import Products from "../products";
import DataFetchingTabs from "../tabs";
import EmptyRow from "../empty-row-skeleton";
import { SourceInfo } from "../source-info";

import { loader } from "@/lib/fake-db";

export const dynamic = "force-dynamic";

export default function SSR() {
  const skeleton = Array.from({ length: 4 }, (_, index) => (
    <EmptyRow key={index} />
  ));
  /*
   * Strictly speaking, the request for data comes a bit further down in the page component,
   * but for the demo it's convenient to snapshot the moment here.
   */
  const requestTime = new Date();
  return (
    <Card className="mt-6 p-4">
      <DataFetchingTabs>
        <Boundary
          labels={["Server Component"]}
          color="violet"
          animateRerendering={true}
          size="small"
        >
          <SourceInfo
            details={{
              init: "fetch initiated at request time.",
              env: "in your serverless functions environment.",
              requestTime,
            }}
          />
        </Boundary>

        <div className="flex space-x-1 mt-3 mb-5">
          <Reload />
          <FetchItemsIndividually />
        </div>

        <CardContent className="p-0">
          <Boundary
            labels={["Server Component"]}
            color="violet"
            animateRerendering={true}
            size="small"
          >
            <Table>
              <Suspense fallback={<TableBody>{skeleton}</TableBody>}>
                <GoFetch initiatedAt={requestTime} />
              </Suspense>
            </Table>
          </Boundary>
        </CardContent>
        <CardFooter className="mt-3">
          <div className="text-xs text-muted-foreground">
            Fetching all items incurs a deliberate{" "}
            <strong>3 second delay</strong>.
          </div>
        </CardFooter>
      </DataFetchingTabs>
    </Card>
  );
}

async function GoFetch({ initiatedAt }: { initiatedAt: Date }) {
  /* fake a delay of 3 seconds */
  const products = await loader();
  return (
    <Products
      fetchDetails={{
        fetchedOn: "at request time",
        time: initiatedAt,
        source: "on the Server",
      }}
      products={products}
    />
  );
}
