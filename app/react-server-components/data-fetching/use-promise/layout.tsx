import "server-only";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Card className="relative border-sky-200">
      <Badge
        className="absolute left-3 -top-3 bg-white border-sky-200"
        variant="outline"
      >
        Server Component
      </Badge>
      <CardHeader>
        <CardTitle>Products</CardTitle>
        <CardDescription>
          <span className="p-4 h-24 block border rounded-lg">
            Products are initiated as a Promise at request time on the server
            (without awaiting it) and forwarded to the client. Client Components
            cannot be asynchronous, but they can be suspended with the use-API
            which awaits for the Promise to resolve inside a Client Component.
            While the Promise is pending, the Suspense boundary will use the
            fallback.
          </span>
        </CardDescription>
      </CardHeader>
      {children}
    </Card>
  );
}
