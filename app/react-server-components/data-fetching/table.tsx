import {
  Table,
  TableHead,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

import { Product } from "@/lib/data";

import LocalDistance from "./local-distance-to-now";
import Number from "./image-at-position";

export function ProductsTable({ children }: { children: React.ReactNode }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="hidden w-[100px] sm:table-cell">
            <span className="sr-only">Image</span>
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Resolved</TableHead>
          <TableHead className="hidden md:table-cell">Where</TableHead>
          <TableHead className="hidden md:table-cell">When</TableHead>
          {/* <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead> */}
        </TableRow>
      </TableHeader>
      <TableBody>{children}</TableBody>
    </Table>
  );
}

export function Row({
  product,
  order = 0,
  fetchDetails,
}: {
  product: Product;
  order: number;
  fetchDetails: {
    fetchedOn: string;
    source: string;
    time: Date;
  };
}) {
  const { fetchedOn, source, time = new Date() } = fetchDetails;
  const timeWithSeconds = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZoneName: "short",
  }).format(time);

  return (
    <TableRow>
      <TableCell className="hidden sm:table-cell">
        <Number value={order} />
      </TableCell>

      <TableCell className="font-medium">{product.name}</TableCell>

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
        className="hidden md:table-cell text-stone-700 font-semibold"
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
  );
}
