import { ImageLink, TextLink } from "./links";

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

import { TableCell, TableRow } from "@/components/ui/table";

import { products } from "@/lib/data";

export default async function Products() {
  /* fake a delay of 3 seconds */
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return (
    <>
      {products.map((product) => (
        <TableRow key={product.id}>
          <TableCell className="hidden sm:table-cell">
            <ImageLink
              id={product.id}
              alt={product.imageAlt}
              src={product.imageSrc}
            />
          </TableCell>

          <TableCell className="font-medium">
            <TextLink id={product.id} name={product.name} />
          </TableCell>

          <TableCell>
            <Badge variant="outline">Draft</Badge>
          </TableCell>
          <TableCell className="hidden md:table-cell">
            ${product.price}
          </TableCell>
          <TableCell className="hidden md:table-cell">25</TableCell>
          <TableCell className="hidden md:table-cell">
            2023-07-12 10:42 AM
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
      ))}
    </>
  );
}
