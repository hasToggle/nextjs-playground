export default async function ServerComponentListItem({
  product,
  children,
}: {
  product: Promise<any>;
  children?: React.ReactNode;
}) {
  const productDetails = await product;
  return (
    <a href={productDetails.href} className="group">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
        <img
          src={productDetails.imageSrc}
          alt={productDetails.imageAlt}
          className="h-full w-full object-cover object-center group-hover:opacity-75"
        />
      </div>
      <h3 className="mt-4 text-sm text-gray-700">{productDetails.name}</h3>
      <p className="mt-1 text-lg font-medium text-gray-900">
        {productDetails.price}
      </p>
    </a>
  );
}
