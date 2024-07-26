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
    <Card>
      <p className="text-muted-foreground">
        RSCs are a new way to build React applications. They are a new primitive
        that enables developers to build applications that are faster by
        default.
      </p>
      <p className="text-muted-foreground">
        When using the App Router in Next, you are automatically opted into
        using React Server Components. By default, every component is a Server
        Component.
      </p>
      <CardHeader>
        <CardTitle>
          There&apos;s more than one way of fetching data in Next
        </CardTitle>
        <CardDescription>
          Fetching data is a spectrum. It spans from the server to the client
          and everything in between.
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
