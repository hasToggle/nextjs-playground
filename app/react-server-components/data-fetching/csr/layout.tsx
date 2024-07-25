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
          <span className="p-4 h-24 block border rounded-lg">
            Products are fetched on the client using useEffect and useState.
            This is the classic client side rendering (CSR) approach. For
            simplicity, the demo does not make use of any libraries like SWR or
            React Query. For production, you should consider using any one of
            the available options.
          </span>
        </CardDescription>
      </CardHeader>
      {children}
    </Card>
  );
}
