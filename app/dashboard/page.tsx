import Input from "@/components/ui/input"; // default export
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

export default function DashboardPage() {
  return (
    <section className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      {/* Simple client-side filter field */}
      <Input placeholder="Filter rows…" className="max-w-sm" />

      <Table>
        <TableCaption className="text-left">Demo data</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow>
            <TableCell>1</TableCell>
            <TableCell>Sample row</TableCell>
            <TableCell>✅</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>2</TableCell>
            <TableCell>Another row</TableCell>
            <TableCell>⏳</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </section>
  );
}