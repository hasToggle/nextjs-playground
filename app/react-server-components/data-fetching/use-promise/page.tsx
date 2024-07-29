import "server-only";

import { Suspense } from "react";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TableBody } from "@/components/ui/table";
import { Boundary } from "@/components/ui/boundary";

import { getAllProducts } from "@/lib/fake-db";

import Table from "../table";
import DataFetchingTabs from "../tabs";
import EmptyRow from "../empty-row-skeleton";
import { Reload } from "../reload-button";
import ClientComponent from "./client-use-promise";
import { SourceInfo } from "../source-info";

export const dynamic = "force-dynamic";

export default function UsePromise() {
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
          {/* <FetchItemsIndividually /> */}
        </div>

        <CardContent className="p-0">
          <Boundary
            labels={["Client Component"]}
            color="blue"
            animateRerendering={true}
            size="small"
          >
            <Table>
              <GoFetch initiatedAt={requestTime} />
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

function GoFetch({ initiatedAt }: { initiatedAt: Date }) {
  const products = getAllProducts();

  const skeleton = Array.from({ length: 4 }, (_, index) => (
    <EmptyRow key={index} />
  ));

  return (
    <Suspense fallback={<TableBody>{skeleton}</TableBody>}>
      <ClientComponent
        fetchDetails={{
          fetchedOn: "at request time",
          time: initiatedAt,
          source: "on the Client",
        }}
        products={products}
      />
    </Suspense>
  );
}
