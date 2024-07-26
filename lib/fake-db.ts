import "server-only";

import { products, Product } from "./data";

export const delay = 3000;

export async function loader(): Promise<Product[]> {
  return await new Promise((resolve) =>
    setTimeout(() => resolve(products), delay)
  );
}

export function getProductIds(): { id: number }[] {
  return products.map((product) => ({
    id: product.id,
  }));
}

export async function getProduct(id: number): Promise<Product | undefined> {
  return await new Promise((resolve) =>
    setTimeout(
      () => resolve(products.find((product) => product.id === id)),
      1000 + Math.random() * delay * 3
    )
  );
}

export async function getAllProducts() {
  return await new Promise<Array<any>>((resolve) => {
    setTimeout(() => {
      resolve(products);
    }, delay);
  });
}
