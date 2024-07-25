import { CalendarIcon, CodeIcon, ClockIcon } from "@radix-ui/react-icons";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { TableBody } from "@/components/ui/table";

import Table from "../table";

import DataFetchingTabs from "../tabs";
import EmptyRow from "../empty-row-skeleton";
import SwitchIndividually from "./switch";

export default function Loading() {
  const skeleton = Array.from({ length: 4 }, (_, index) => (
    <EmptyRow key={index} />
  ));
  /*
   * Strictly speaking, the request for data comes a bit further down in the page component,
   * but for the demo it's convenient to snapshot the moment here.
   */
  const requestTime = new Date().toISOString();
  return (
    <DataFetchingTabs>
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
      <SwitchIndividually />

      <CardContent>
        <Table>
          <TableBody>{skeleton}</TableBody>
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
