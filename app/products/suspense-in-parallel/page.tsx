import { Suspense } from "react";
import ServerComponent from "./streaming";
import ClientWrapper from "./client-wrapper";

export const dynamic = "force-dynamic";

export default function Products() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <Suspense fallback={<p>Loading...</p>}>
          <ServerComponent>
            <h3>HELLO</h3>
          </ServerComponent>
        </Suspense>
      </div>
    </div>
  );
}
