import { Suspense } from "react";
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

import EmptyRow from "../../empty-row-skeleton";
import { ImageLink, TextLink } from "../../links";

import { getProductIds, getProduct } from "@/lib/fake-db";

export default function StreamingOutOfOrder({
  initiatedAt,
}: {
  initiatedAt: Date;
}) {
  const products = getProductIds();
  return (
    <TableBody>
      {products.map((product) => (
        <Suspense key={product.id} fallback={<EmptyRow />}>
          <Item
            id={product.id}
            fetchDetails={{
              fetchedOn: "at request time",
              source: "on the Server",
              time: initiatedAt,
            }}
          />
        </Suspense>
      ))}
    </TableBody>
  );
}

async function Item({
  fetchDetails,
  id,
}: {
  fetchDetails: {
    fetchedOn: string;
    source: string;
    time: Date;
  };
  id: number;
}) {
  const product = await getProduct(id);

  if (!product) return null;

  const { fetchedOn, source, time = new Date() } = fetchDetails;
  const relativeDate = formatDistanceToNow(time, { addSuffix: true });
  const timeWithSeconds = format(new Date(), "HH:mm:ss");
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
        <Badge variant="outline" className="-ml-2.5">
          {fetchedOn}
        </Badge>
      </TableCell>

      <TableCell className="hidden md:table-cell">
        <Badge variant="outline" className="-ml-2.5">
          {source}
        </Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell text-sky-700 font-semibold">
        {relativeDate} ({timeWithSeconds})
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
  );
}
