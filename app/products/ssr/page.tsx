import Link from "next/link";

export default function SSRPage() {
  return (
    <>
      <h1>SSR - cached & dynamic</h1>
      <Link href="/products/ssr/cached">Show cached products</Link>
      <Link href="/products/ssr/dynamic">Load server-rendered products</Link>
    </>
  );
}
