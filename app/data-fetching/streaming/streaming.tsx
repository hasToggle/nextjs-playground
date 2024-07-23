import { Suspense } from "react";
import { MoreHorizontal } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow, TableBody } from "@/components/ui/table";

import EmptyRow from "../empty-row-skeleton";
import { ImageLink, TextLink } from "../links";

import { getProducts, getProduct } from "@/lib/fake-db";

export default function Products() {
  const products = getProducts();
  return (
    <TableBody>
      {products.map((product) => (
        <Suspense key={product.id} fallback={<EmptyRow />}>
          <Item id={product.id} />
        </Suspense>
      ))}
    </TableBody>
  );
}

async function Item({ id }: { id: number }) {
  const product = await getProduct(id);

  if (!product) return null;

  return (
    <TableRow key={product?.id || Math.random().toString(36).substring(2)}>
      <TableCell className="hidden sm:table-cell">
        <ImageLink
          id={product?.id}
          alt={product?.imageAlt}
          src={product?.imageSrc}
        />
      </TableCell>

      <TableCell className="font-medium">
        <TextLink id={product?.id} name={product?.name} />
      </TableCell>

      <TableCell>
        <Badge variant="outline">Draft</Badge>
      </TableCell>

      <TableCell className="hidden md:table-cell">{product?.price}</TableCell>

      <TableCell className="hidden md:table-cell">25</TableCell>
      <TableCell className="hidden md:table-cell">
        {new Date().toISOString()}
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
