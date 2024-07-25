import "server-only";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Layout({ children }: { children: React.ReactNode }) {
  /*
   * Strictly speaking, the request for data comes a bit further down in the page component,
   * but for the demo it's convenient to snapshot the moment here.
   */
  const requestTime = new Date().toISOString();
  return (
    <Card className="relative border-orange-200">
      <Badge
        className="absolute left-3 -top-3 bg-white border-orange-200"
        variant="outline"
      >
        Client Component
      </Badge>
      <CardHeader>
        <CardTitle>Products</CardTitle>
        <CardDescription>
          Fetch initiated at request time ({requestTime}) in your browser.
        </CardDescription>
      </CardHeader>
      {children}
    </Card>
  );
}
