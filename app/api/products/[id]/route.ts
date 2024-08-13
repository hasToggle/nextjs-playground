import { getProduct } from "@/lib/fake-db";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const id = Number(params.id);
  const product = await getProduct(id);
  return Response.json({ product });
}
