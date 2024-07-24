import "server-only";

import { CardContent, CardFooter } from "@/components/ui/card";

import Table from "../table";
import StreamingOutOfOrder from "./streaming";
import DataFetchingTabs from "../tabs";

export const dynamic = "force-dynamic";

export default function Streaming() {
  return (
    <DataFetchingTabs>
      <CardContent>
        <Table>
          <GoFetch />
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

function GoFetch() {
  return <StreamingOutOfOrder />;
}
