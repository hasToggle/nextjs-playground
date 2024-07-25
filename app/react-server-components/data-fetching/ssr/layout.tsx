import "server-only";

import { InfoCircledIcon } from "@radix-ui/react-icons";

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
          <span className="p-4 h-24 flex border rounded-lg">
            Products are fetched at request time and streamed to the user. This
            is most useful for content that changes frequently, such as social
            media feeds or real-time data. The initial response is slower with
            SSR because the server has to fetch the data and build the page
            before sending it to the user.
            {/* <InfoCircledIcon className="mr-2 h-10 w-10" />
            Without PPR, every request goes back to the server in your specified
            region, which rebuilds the static shell and sends back the HTML
            while streaming in any dynamic content. With PPR, requests go to a
            CDN close to the user&apos;s location, which sends back the static
            shell and makes a dynamic request to your server for streaming the
            dynamic content. The initial response is faster with PPR because
            CDNs are usually closer to the user than your server, and the
            resource does not have to be rebuilt since it&apos;s static anyway. */}
          </span>
        </CardDescription>
      </CardHeader>
      {children}
    </Card>
  );
}
