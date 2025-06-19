import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableCaption,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";

export default function DashboardPage() {
  return (
    <section className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      {/* simple client-side filter input (hook it up later) */}
      <Input placeholder="Filter rows…" className="max-w-sm" />

      <Table>
        <TableCaption>A demo data table</TableCaption>

        {/* make header sticky if the table ever overflows */}
        <TableHeader className="sticky top-0 bg-background">
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow /* key={1} */>
            <TableCell>1</TableCell>
            <TableCell>Sample row</TableCell>
            <TableCell>✅</TableCell>
          </TableRow>

          <TableRow /* key={2} */>
            <TableCell>2</TableCell>
            <TableCell>Another row</TableCell>
            <TableCell>⏳</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </section>
  );
}