import { Suspense } from "react";
import Products from "./products";

export const dynamic = "force-dynamic";

export default function SSR() {
  return (
    <>
      <Suspense fallback={<p>Embedded Loading...</p>}>
        <Products />
      </Suspense>
    </>
  );
}
