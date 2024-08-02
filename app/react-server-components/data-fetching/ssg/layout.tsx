import "server-only";

import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="h-28">
        <div className="px-4 py-3 my-auto border rounded-lg">
          <div>
            Products are fetched at build time and statically cached in a CDN
            for the lifetime of the deployment. This is most useful for content
            that does not change frequently, such as marketing pages, blog
            posts, and documentation. The initial response is faster with SSG
            because the content is already built and cached. You can trigger a
            revalidation of the static page with{" "}
            <Link
              href="https://nextjs.org/docs/app/api-reference/functions/revalidatePath"
              className="font-medium underline underline-offset-4"
              target="_blank"
              rel="noopener noreferrer"
            >
              revalidatePath
            </Link>{" "}
            and{" "}
            <Link
              href="https://nextjs.org/docs/app/api-reference/functions/revalidateTag"
              className="font-medium underline underline-offset-4"
              target="_blank"
              rel="noopener noreferrer"
            >
              revalidateTag
            </Link>
            .
          </div>
        </div>
      </div>

      {children}
    </>
  );
}
