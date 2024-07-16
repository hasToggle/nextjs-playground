import { products, type Product } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function SSR() {
  const resolvedProducts = await Promise.all<Product>(products);
  return (
    <>
      <h1>Server-Side Rendering</h1>
      {resolvedProducts?.map((product) => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            <img
              src={product.imageSrc}
              alt={product.imageAlt}
              className="h-full w-full object-cover object-center group-hover:opacity-75"
            />
          </div>
          <p>{product.price}</p>
        </div>
      ))}
    </>
  );
}
