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

import { getProductIds, getProduct } from "@/lib/fake-db";

export default function Products() {
  const products = getProductIds();
  return (
    <TableBody>
      {products.map((product) => (
        <Suspense key={product.id} fallback={<EmptyRow />}>
          <Item
            fetchDetails={{
              fetchedOn: "On Request",
              time: "",
              source: "Server",
            }}
            id={product.id}
          />
        </Suspense>
      ))}
    </TableBody>
  );
}

async function Item({
  fetchDetails = {
    fetchedOn: "",
    source: "",
    time: "",
  },
  id,
}: {
  fetchDetails: {
    fetchedOn: string;
    source: string;
    time: string;
  };
  id: number;
}) {
  const product = await getProduct(id);

  if (!product) return null;

  const { fetchedOn, source, time } = fetchDetails;

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
        <Badge variant="outline">{fetchedOn}</Badge>
      </TableCell>

      <TableCell className="hidden md:table-cell">{source}</TableCell>
      <TableCell className="hidden md:table-cell text-sky-700 font-semibold">
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
