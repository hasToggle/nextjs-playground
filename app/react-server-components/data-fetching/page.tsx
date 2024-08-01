import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Boundary } from "@/components/ui/boundary";

import { Reload } from "./reload-button";
import { ProductsTable } from "./table";
import DataFetchingTabs from "./tabs";
import EmptyRow from "./empty-row-skeleton";
import { SourceInfo } from "./source-info";

export default function DataFetching() {
  const skeleton = Array.from({ length: 4 }, (_, index) => (
    <EmptyRow key={index} />
  ));
  return (
    <>
      <div className="h-28">
        <div className="px-4 py-3 my-auto border rounded-lg">
          <p className="text-muted-foreground">
            RSCs are a new primitive that enables developers to build
            applications that are faster by default. This demo is using the App
            Router in Next, which automatically opts into using React Server
            Components.
          </p>
        </div>
      </div>

      <Card className="mt-6 p-4">
        <DataFetchingTabs>
          <Boundary
            labels={["Server / Client Component"]}
            color="default"
            animateRerendering={true}
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

          <div className="flex space-x-1 mt-3 mb-6">
            <Reload disabled />
          </div>

          <CardContent className="p-0">
            <Boundary
              labels={["Server / Client Component"]}
              color="default"
              animateRerendering={true}
              size="small"
            >
              <ProductsTable>
                <>{skeleton}</>
              </ProductsTable>
            </Boundary>
          </CardContent>
          <CardFooter className="mt-3">
            <div className="text-xs text-muted-foreground">
              Fetching items incurs a deliberate <strong>3 second delay</strong>
              .
            </div>
          </CardFooter>
        </DataFetchingTabs>
      </Card>
    </>
  );
}
