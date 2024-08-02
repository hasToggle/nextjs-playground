import "server-only";

import { products, Product } from "./data";

export const delay = 3000;

export function getAllProducts(): Promise<Product[]> {
  return new Promise((resolve) => setTimeout(() => resolve(products), delay));
}

export function getProductIds(): { id: number }[] {
  return products.map((product) => ({
    id: product.id,
  }));
}

export function getProduct(id: number): Promise<Product | undefined> {
  return new Promise((resolve) =>
    setTimeout(
      () => resolve(products.find((product) => product.id === id)),
      1000 + Math.random() * delay * 3
    )
  );
}
