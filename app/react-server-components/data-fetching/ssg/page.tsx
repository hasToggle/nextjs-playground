import "server-only";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Boundary } from "@/components/ui/boundary";

import Table from "../table";
import Products from "../products";
import DataFetchingTabs from "../tabs";
import { SourceInfo } from "../source-info";
import { Reload } from "../reload-button";

import { loader } from "@/lib/fake-db";

export default function SSG() {
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
          animateRerendering={false}
          size="small"
        >
          <SourceInfo
            details={{
              init: "Fetch initiated at build time.",
              env: "in your serverless functions environment.",
              requestTime,
            }}
          />
        </Boundary>

        <div className="flex space-x-1 mt-3 mb-5">
          <Reload />
        </div>

        <CardContent className="p-0">
          <Boundary
            labels={["Server Component"]}
            color="violet"
            animateRerendering={false}
            size="small"
          >
            <Table>
              <GoFetch initiatedAt={requestTime} />
            </Table>
          </Boundary>
        </CardContent>
        <CardFooter className="mt-3">
          <div className="text-xs text-muted-foreground">
            All items remain{" "}
            <strong>static for the lifetime of a deployment.</strong> The
            initial delay of 3 seconds happens at build time and is never
            experienced by the user.
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
        fetchedOn: "at build time",
        time: initiatedAt,
        source: "on the Server",
      }}
      products={products}
    />
  );
}
