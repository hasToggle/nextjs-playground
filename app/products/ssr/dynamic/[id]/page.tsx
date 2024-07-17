import { products } from "@/lib/data";

export async function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }];
}

export default async function SSR({ params }: { params: { id: string } }) {
  /* fake a delay of 3 seconds during BUILD TIME */
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const product = products.find(
    (product) => product.id === parseInt(params.id)
  );
  console.log("ID:", params);
  if (!product) {
    return <h2>Product not found</h2>;
  }

  return (
    <>
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
        <img
          src={product.imageSrc}
          alt={product.imageAlt}
          className="h-full w-full object-cover object-center group-hover:opacity-75"
        />
      </div>
      <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
      <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p>
    </>
  );
}
