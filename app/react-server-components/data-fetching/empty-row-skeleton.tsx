import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";

export default function EmptyRow() {
  return (
    <TableRow key={Math.random().toString(36).substring(2)}>
      <TableCell className="hidden sm:table-cell">
        <Skeleton className="h-[40px] w-[40px] rounded-md bg-gray-200" />
      </TableCell>

      <TableCell className="font-medium">
        <Skeleton className="h-4 w-[160px] bg-gray-200" />
      </TableCell>

      <TableCell>
        <Skeleton className="h-4 w-[80px] rounded-md bg-gray-200" />
      </TableCell>

      <TableCell className="hidden md:table-cell">
        <Skeleton className="h-4 w-[30px] bg-gray-200" />
      </TableCell>

      <TableCell className="hidden md:table-cell">
        <Skeleton className="h-4 w-[180px] rounded-md bg-gray-200" />
      </TableCell>
    </TableRow>
  );
}
