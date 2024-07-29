import "server-only";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { FetchItemsIndividually } from "../../toggles";
import { Reload } from "../../reload-button";
import Table from "../../table";
import DataFetchingTabs from "../../tabs";
import StreamingOutOfOrder from "./streaming";
import { SourceInfo, Boundary } from "../../source-info";

export const dynamic = "force-dynamic";

export default function SSRIndividually() {
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
          <FetchItemsIndividually />
        </div>

        <CardContent className="p-0">
          <div className="relative p-1 rounded-md border border-purple-300">
            <Badge
              className="absolute left-3 -top-3 bg-white border-purple-300"
              variant="outline"
            >
              Server Component
            </Badge>

            <Table>
              <StreamingOutOfOrder initiatedAt={requestTime} />
            </Table>
          </div>
        </CardContent>
        <CardFooter className="mt-3">
          <div className="text-xs text-muted-foreground">
            To better observe how individual items are streaming in, fetching
            all items can take <strong>up to 10 seconds</strong>.
          </div>
        </CardFooter>
      </DataFetchingTabs>
    </Card>
  );
}
