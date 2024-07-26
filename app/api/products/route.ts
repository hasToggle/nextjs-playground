import { products } from "@/lib/data";
import { delay } from "@/lib/fake-db";

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, delay));
  return Response.json({ products });
}
