import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";

interface EmptyRowSkeletonProps {
  count?: number;
}
export default function EmptyRowSkeleton({ count = 1 }: EmptyRowSkeletonProps) {
  const skeleton = Array.from({ length: count }, (_, index) => (
    <TableRowSkeleton key={index} />
  ));

  return <>{skeleton}</>;
}

function TableRowSkeleton() {
  return (
    <TableRow>
      <TableCell className="hidden sm:table-cell">
        <Skeleton className="h-[40px] w-[40px] rounded-md bg-gray-200" />
      </TableCell>

      <TableCell className="font-medium">
        <Skeleton className="h-4 w-[170px] bg-gray-200" />
      </TableCell>

      <TableCell>
        <Skeleton className="h-4 w-[80px] rounded-md bg-gray-200" />
      </TableCell>

      <TableCell className="hidden md:table-cell">
        <Skeleton className="h-4 w-[80px] bg-gray-200" />
      </TableCell>

      <TableCell className="hidden md:table-cell">
        <Skeleton className="h-4 w-[260px] rounded-md bg-gray-200" />
      </TableCell>
    </TableRow>
  );
}
