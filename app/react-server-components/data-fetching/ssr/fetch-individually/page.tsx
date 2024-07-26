import "server-only";

import { CalendarIcon, CodeIcon, ClockIcon } from "@radix-ui/react-icons";

import { Card, CardContent, CardFooter } from "@/components/ui/card";

import { FetchItemsIndividually } from "../../toggles";
import { Reload } from "../../reload-button";
import Table from "../../table";
import DataFetchingTabs from "../../tabs";
import StreamingOutOfOrder from "./streaming";

export const dynamic = "force-dynamic";

export default function SSRIndividually() {
  /*
   * Strictly speaking, the request for data comes a bit further down in the page component,
   * but for the demo it's convenient to snapshot the moment here.
   */
  const requestTime = new Date().toISOString();
  return (
    <DataFetchingTabs>
      <div className="flex space-x-1">
        <Reload />
        <FetchItemsIndividually />
      </div>
      <Card className="mb-3 p-4">
        <span className="flex items-center text-base">
          <ClockIcon className="mr-2 h-4 w-4" />
          Fetch initiated at request time.
        </span>
        <span className="mt-2 flex items-center text-base">
          <CodeIcon className="mr-2 h-4 w-4" />
          In your serverless functions environment.
        </span>
        <span className="mt-2 flex items-center text-base">
          <CalendarIcon className="mr-2 h-4 w-4" />
          At {requestTime}.
        </span>
      </Card>

      <CardContent>
        <Table>
          <StreamingOutOfOrder />
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
