"use client";

import Image from "next/image";
import { use, useState } from "react";

export default function ClientComponent({
  /* if some props can't be serialized, why not make the linter scream at us here? => Because you can wrap this component within another client component and pass props then */
  products,
  children,
}: {
  products: Promise<Array<any>>;
  children?: React.ReactNode;
}) {
  const [count, setCount] = useState(0);
  const prods = use(products);
  return (
    <>
      <h2>Client Component</h2>
      <button
        className="px-8 py-2 bg-gray-600 rounded-md"
        onClick={() => setCount(count + 1)}
      >
        {count}
      </button>
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {prods.map((product) => (
          <a key={product.id} href={product.href} className="group">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
              <Image
                src={product.imageSrc}
                alt={product.imageAlt}
                width={64}
                height={64}
                className="h-full w-full object-cover object-center group-hover:opacity-75"
              />
            </div>
            <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
            <p className="mt-1 text-lg font-medium text-gray-900">
              {product.price}
            </p>
          </a>
        ))}
      </div>
      <p>Your children:</p>
      <div>{children}</div>
    </>
  );
}
