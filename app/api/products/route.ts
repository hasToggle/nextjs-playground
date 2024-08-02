import { getAllProducts } from "@/lib/fake-db";

export async function GET() {
  const products = await getAllProducts();
  return Response.json({ products });
}
