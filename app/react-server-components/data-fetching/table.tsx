import { CalendarIcon, CodeIcon, ClockIcon } from "@radix-ui/react-icons";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHead,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";

import { Product } from "@/lib/data";

import LocalDistance from "./local-distance-to-now";
import Number from "./number-image";

export function ProductsTable({ children }: { children: React.ReactNode }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="hidden w-[100px] sm:table-cell">
            <span className="sr-only">Image</span>
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead>
            <div className="flex items-center">
              <ClockIcon className="mr-2 h-4 w-4" />
              Fetch resolved
            </div>
          </TableHead>
          <TableHead className="hidden md:table-cell">
            <div className="flex items-center">
              <CodeIcon className="mr-2 h-4 w-4" />
              Environment
            </div>
          </TableHead>
          <TableHead className="hidden md:table-cell">
            <div className="flex items-center">
              <CalendarIcon className="mr-2 h-4 w-4" />
              Time when resolved
            </div>
          </TableHead>
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
  }).format(new Date());

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
        className="hidden font-semibold text-stone-700 md:table-cell"
        suppressHydrationWarning
      >
        <span>
          <LocalDistance requestTime={time} /> ({timeWithSeconds})
        </span>
      </TableCell>
    </TableRow>
  );
}
