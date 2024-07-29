import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { TableBody } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

import { Reload } from "./reload-button";
import Table from "./table";
import DataFetchingTabs from "./tabs";
import EmptyRow from "./empty-row-skeleton";
import { SourceInfo, Boundary } from "./source-info";

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
          <Boundary variant="server" label="Server / Client Component">
            <SourceInfo
              details={{
                init: "displays when a fetch is initiated.",
                env: "shows which environment the code is running in.",
                requestTime: new Date(),
              }}
            />
          </Boundary>

          <div className="flex space-x-1 mb-5">
            <Reload disabled />
          </div>

          <CardContent className="p-0">
            <div className="relative p-1 rounded-md border border-purple-300">
              <Badge
                className="absolute left-3 -top-3 bg-white border-purple-300"
                variant="outline"
              >
                Server / Client Component
              </Badge>

              <Table>
                <TableBody>{skeleton}</TableBody>
              </Table>
            </div>
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
