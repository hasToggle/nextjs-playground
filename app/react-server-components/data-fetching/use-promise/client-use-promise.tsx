"use client";

import { use } from "react";
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

import { ImageLink, TextLink } from "../links";

export default function ClientComponent({
  /* if some props can't be serialized, why not make the linter scream at us here? => Because you can wrap this component within another client component and pass props then */
  fetchDetails = {
    fetchedOn: "",
    source: "",
    time: "",
  },
  products,
  children,
}: {
  fetchDetails: {
    fetchedOn: string;
    source: string;
    time: string;
  };
  products: Promise<Array<any>>;
  children?: React.ReactNode;
}) {
  const prods = use(products);
  const { fetchedOn, source, time } = fetchDetails;
  return (
    <TableBody>
      {prods.map((product) => (
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
            <Badge variant="outline">{fetchedOn}</Badge>
          </TableCell>
          <TableCell className="hidden md:table-cell">{source}</TableCell>
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
      ))}
    </TableBody>
  );
}
