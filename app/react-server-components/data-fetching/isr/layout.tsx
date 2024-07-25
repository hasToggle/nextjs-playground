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
            Products are static for 30 seconds. If a request is made within 30
            seconds, the cached HTML is served from a CDN. After 30 seconds, the
            cache is invalidated, and the next request will trigger a rebuild of
            the page in the background but still serve the stale HTML in the
            meantime. Refresh the page once more to see the new content.
          </span>
        </CardDescription>
      </CardHeader>
      {children}
    </Card>
  );
}
