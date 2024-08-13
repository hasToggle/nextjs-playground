import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Boundary } from "@/components/ui/boundary";

import DataFetchingTabs from "./tabs";
import EmptyRowSkeleton from "./empty-row-skeleton";
import { ProductsTable } from "./table";
import { SourceInfo } from "./source-info";
import { Reload } from "./reload-button";

export default function DataFetching() {
  return (
    <>
      <div className="h-28">
        <div className="my-auto rounded-lg border px-4 py-3">
          <p className="text-muted-foreground">
            React Server Components (RSCs) introduce a powerful new way to build
            faster and more efficient applications by default. They allow
            developers to seamlessly combine server-side and client-side logic
            within a single React application. Server components can fetch and
            process data directly on the server, optimizing performance, while
            client components handle the interactivity on the client side,
            ensuring a responsive and engaging user experience. This blend of
            server and client capabilities offers a streamlined approach to
            building modern web applications.
          </p>
        </div>
      </div>

      <Card className="mt-6 p-4">
        <DataFetchingTabs>
          <Boundary
            labels={["Server / Client Component"]}
            color="default"
            animateRerendering={false}
            size="small"
          >
            <SourceInfo
              details={{
                init: "displays when a fetch is initiated.",
                env: "shows which environment the code is running in.",
                requestTime: new Date(),
              }}
            />
          </Boundary>

          <div className="mb-6 mt-3 flex space-x-1">
            <Reload disabled />
          </div>

          <CardContent className="p-0">
            <Boundary
              labels={["Server / Client Component"]}
              color="default"
              animateRerendering={false}
              size="small"
            >
              <ProductsTable>
                <EmptyRowSkeleton count={4} />
              </ProductsTable>
            </Boundary>
          </CardContent>
          <CardFooter className="mt-3">
            <div className="text-xs text-muted-foreground">
              Choose a <strong>rendering strategy</strong> to see the behavior.
            </div>
          </CardFooter>
        </DataFetchingTabs>
      </Card>
    </>
  );
}
