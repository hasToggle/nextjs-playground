import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function TableOfProducts({
  children,
}: {
  children: React.ReactNode;
}) {
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
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      {children}
    </Table>
  );
}
