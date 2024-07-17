import { products } from "@/lib/data";

export default async function Products() {
  /* fake a delay of 3 seconds */
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return (
    <>
      {products?.map((product) => (
        <div key={product.id}>
          <div className="my-4 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            <div>
              <img
                src={product.imageSrc}
                alt={product.imageAlt}
                className="h-full w-full object-cover object-center group-hover:opacity-75"
              />
            </div>
            <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
            <p className="mt-1 text-lg font-medium text-gray-900">
              {product.price}
            </p>
          </div>
        </div>
      ))}
    </>
  );
}
