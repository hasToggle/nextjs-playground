import { products } from "@/lib/data";
import SquareOne from "@/public/square-1.svg";

export async function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }];
}

export default async function SSR({ params }: { params: { id: string } }) {
  /* fake a delay of 3 seconds during BUILD TIME */
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const product = products.find(
    (product) => product.id === parseInt(params.id)
  );

  if (!product) {
    return <h2>Product not found</h2>;
  }

  return (
    <>
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
        <img
          src={SquareOne}
          alt="individual item"
          className="h-full w-full object-cover object-center group-hover:opacity-75"
        />
      </div>
      <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
    </>
  );
}
