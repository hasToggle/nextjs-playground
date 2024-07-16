import { Suspense } from "react";
import Item from "./item";
import { products } from "@/lib/data";
import { createPromise } from "@/lib/utils";

export default async function ServerComponent({
  /* if some props can't be serialized, why not make the linter scream at us here? => Because you can wrap this component within another client component and pass props then */
  children,
}: {
  children?: React.ReactNode;
}) {
  const productList = products.map((product) => createPromise(product));

  return (
    <>
      <h2>Server Component</h2>

      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {productList.map((product, i) => (
          <Suspense key={i} fallback={<div>Loading {i + 1} ...</div>}>
            <Item product={product} />
          </Suspense>
        ))}
      </div>
      <p>Your children:</p>
      <div>{children}</div>
    </>
  );
}
