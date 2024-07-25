import "server-only";

import {
  CalendarIcon,
  CodeIcon,
  ClockIcon,
  InfoCircledIcon,
} from "@radix-ui/react-icons";

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
          <Card className="mt-7 p-4">
            <span className="flex items-center text-base">
              <ClockIcon className="mr-2 h-4 w-4" />
              Fetch initiated at request time.
            </span>
            <span className="mt-2 flex items-center text-base">
              <CodeIcon className="mr-2 h-4 w-4" />
              In your serverless functions environment.
            </span>
            <span className="mt-2 flex items-center text-base">
              <CalendarIcon className="mr-2 h-4 w-4" />
              At {requestTime}.
            </span>
          </Card>

          <Card className="mt-10 p-4 inline-flex">
            <InfoCircledIcon className="mr-2 h-10 w-10" />
            Without PPR, every request goes back to the server in your specified
            region, which rebuilds the static shell and sends back the HTML
            while streaming in any dynamic content. With PPR, requests go to a
            CDN close to the user&apos;s location, which sends back the static
            shell and makes a dynamic request to your server for streaming the
            dynamic content. The initial response is faster with PPR because
            CDNs are usually closer to the user than your server, and the
            resource does not have to be rebuilt since it&apos;s static anyway.
          </Card>
        </CardDescription>
      </CardHeader>
      {children}
    </Card>
  );
}
