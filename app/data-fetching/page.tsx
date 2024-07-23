import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import DataFetchingTabs from "./tabs";

export default function DataFetching() {
  return (
    <Card className="relative border-sky-200">
      <CardHeader>
        <CardTitle>Products</CardTitle>
        <CardDescription>
          Play around with the various data-fetching options.
        </CardDescription>
      </CardHeader>
      <DataFetchingTabs>
        <CardContent></CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Showing <strong>1-10</strong> of <strong>32</strong> products
          </div>
        </CardFooter>
      </DataFetchingTabs>
    </Card>
  );
}
