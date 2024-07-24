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
        <CardTitle>Fetching data is a spectrum</CardTitle>
        <CardDescription>
          There&apos;s more than one way of fetching data in Next.
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
