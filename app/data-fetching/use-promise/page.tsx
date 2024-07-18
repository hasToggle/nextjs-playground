import { Suspense } from "react";
import ClientComponent from "./client-use-promise";
import ClientWrapper from "./client-wrapper";
import { products } from "@/lib/data";

export const dynamic = "force-dynamic";

export default function Products() {
  const productList = new Promise<Array<any>>((resolve) => {
    setTimeout(() => {
      resolve(products);
    }, 3000);
  });

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <ClientWrapper>
          <Suspense fallback={<p>Loading...</p>}>
            <ClientComponent products={productList}>
              <h3>HELLO</h3>
            </ClientComponent>
          </Suspense>
        </ClientWrapper>
      </div>
    </div>
  );
}
