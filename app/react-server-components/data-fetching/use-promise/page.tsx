import "server-only";

import { Suspense } from "react";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TableBody } from "@/components/ui/table";
import { getAllProducts } from "@/lib/fake-db";

import Table from "../table";
import DataFetchingTabs from "../tabs";
import EmptyRow from "../empty-row-skeleton";
import { Reload } from "../reload-button";
import ClientComponent from "./client-use-promise";
import { SourceInfo, Boundary } from "../source-info";

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
        <Boundary variant="server" label="Server Component">
          <SourceInfo
            details={{
              init: "fetch initiated at request time.",
              env: "in your serverless functions environment.",
              requestTime,
            }}
          />
        </Boundary>

        <div className="flex space-x-1 mb-5">
          <Reload />
          {/* <FetchItemsIndividually /> */}
        </div>

        <CardContent className="p-0">
          <div className="relative p-1 rounded-md border border-blue-300">
            <Badge
              className="absolute left-3 -top-3 bg-white border-blue-300"
              variant="outline"
            >
              Client Component
            </Badge>

            <Table>
              <GoFetch initiatedAt={requestTime} />
            </Table>
          </div>
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
