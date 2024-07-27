import { MoreHorizontal } from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";

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

import { Product } from "@/lib/data";

import { ImageLink, TextLink } from "./links";
import LocalDistance from "./local-distance-to-now";

export default function Products({
  fetchDetails,
  products = [],
}: {
  fetchDetails: {
    fetchedOn: string;
    source: string;
    time: Date;
  };
  products: Product[];
}) {
  const { fetchedOn, source, time = new Date() } = fetchDetails;
  /* const relativeDate = formatDistanceToNow(time, { addSuffix: true }); */
  const timeWithSeconds = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZoneName: "short",
  }).format(new Date());
  return (
    <TableBody>
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
            <Badge variant="outline" className="-ml-2.5">
              {fetchedOn}
            </Badge>
          </TableCell>
          <TableCell className="hidden md:table-cell">
            <Badge variant="outline" className="-ml-2.5">
              {source}
            </Badge>
          </TableCell>
          <TableCell
            className="hidden md:table-cell text-sky-700 font-semibold"
            suppressHydrationWarning
          >
            <span>
              <LocalDistance requestTime={time} /> ({timeWithSeconds})
            </span>
          </TableCell>
          {/* <TableCell>
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
          </TableCell> */}
        </TableRow>
      ))}
    </TableBody>
  );
}
