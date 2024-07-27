import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";

export default function EmptyRow() {
  return (
    <TableRow key={Math.random().toString(36).substring(2)}>
      <TableCell className="hidden sm:table-cell">
        <Skeleton className="h-[64px] w-[64px] rounded-md bg-gray-200" />
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
