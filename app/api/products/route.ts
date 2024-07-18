import { products } from "@/lib/data";

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return Response.json({ products });
}
