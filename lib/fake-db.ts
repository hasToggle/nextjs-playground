import { products, Product } from "./data";

export async function loader(): Promise<Product[]> {
  return await new Promise((resolve) =>
    setTimeout(() => resolve(products), 3000)
  );
}
