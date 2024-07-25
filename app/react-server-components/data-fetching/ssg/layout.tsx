import "server-only";

import Link from "next/link";

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
            Products are fetched at build time and statically cached in a CDN
            for the lifetime of the deployment. This is most useful for content
            that does not change frequently, such as marketing pages, blog
            posts, and documentation. The initial response is faster with SSG
            because the content is already built and cached. You can trigger a
            revalidation of the static page with{" "}
            <Link href="https://nextjs.org/docs/app/api-reference/functions/revalidatePath">
              revalidatePath
            </Link>{" "}
            and{" "}
            <Link href="https://nextjs.org/docs/app/api-reference/functions/revalidateTag">
              revalidateTag
            </Link>
            .
          </span>
        </CardDescription>
      </CardHeader>
      {children}
    </Card>
  );
}
