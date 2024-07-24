import { CardContent, CardFooter } from "@/components/ui/card";

import { TableBody } from "@/components/ui/table";

import Table from "../table";

import DataFetchingTabs from "../tabs";
import EmptyRow from "../empty-row-skeleton";

export default function Loading() {
  const skeleton = Array.from({ length: 4 }, (_, index) => (
    <EmptyRow key={index} />
  ));

  return (
    <DataFetchingTabs>
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
