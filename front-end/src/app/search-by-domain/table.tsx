"use client";

import React, { useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, Eye } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PrivateRoute from "@/components/ui/privateRoute";
import { fetchInfections } from "@/actions/search-by-domain.actions";
import DomainSearchInfo from "./info-block";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Define the type for a vulnerability record
export type VulnerabilityRecord = {
  id: string;
  stealer_type: string;
  computer_information: {
    ip: string;
    malware_path: string;
    infection_date: string;
    username: string;
  };
  credentials: {
    root_domain: string;
    creds: {
      username: string;
      credential_category: string;
      password?: string;
      email?: string;
    }[];
  }[];
};

// Mock data (replace this with your API data as needed)
const data: VulnerabilityRecord[] = [
  {
    id: "70c63f250cef374fc893ce7820f74196",
    stealer_type: "LummaC2",
    computer_information: {
      ip: "49.36.187.55",
      malware_path:
        "C:\\Users\\acer\\AppData\\Local\\Temp\\1073819001\\9e15f453c8.exe",
      infection_date: "2025-02-10T16:13:08+00:00",
      username: "acer",
    },
    credentials: [
      {
        root_domain: "linkedin.com",
        creds: [
          {
            username: "ts552750@gmail.com",
            credential_category: "CUSTOMER_SERVICE",
          },
        ],
      },
    ],
  },
  // Add more mock records if needed...
];

// Define column definitions for our table
export const columns: ColumnDef<VulnerabilityRecord>[] = [
  {
    accessorFn: (row) => row.credentials[0]?.root_domain,
    id: "domain",
    header: "Domain",
    cell: ({ getValue }) => <div>{getValue() as string}</div>,
  },
  {
    accessorFn: (row) => row.computer_information.ip,
    id: "ip",
    header: "IP Address",
    cell: ({ getValue }) => <div>{getValue() as string}</div>,
  },
  {
    accessorFn: (row) => row.credentials[0]?.creds[0]?.username,
    id: "username",
    header: "Username",
    cell: ({ getValue }) => <div>{getValue() as string}</div>,
  },
  {
    accessorFn: (row) => row.credentials[0]?.creds[0]?.credential_category,
    id: "credentialCategory",
    header: "Credential Category",
    cell: ({ getValue }) => <div>{getValue() as string}</div>,
  },
  {
    accessorKey: "stealer_type",
    header: "Malware Type",
    cell: ({ getValue }) => <div>{getValue() as string}</div>,
  },
  {
    accessorFn: (row) => row.computer_information.malware_path,
    id: "malwarePath",
    header: "Malware Path",
    cell: ({ getValue }) => (
      <div className="truncate max-w-xs">{getValue() as string}</div>
    ),
  },
  {
    accessorFn: (row) => row.computer_information.infection_date,
    id: "infectionDate",
    header: "Infection Date",
    cell: ({ getValue }) => (
      <div>{new Date(getValue() as string).toLocaleString()}</div>
    ),
  },
  {
    accessorFn: (row) => row.credentials[0]?.creds[0]?.username,
    id: "credentials",
    header: "credentials",
    cell: ({ row }) => {
      const [open, setOpen] = useState(false);
      const credentials = row.original.credentials[0]?.creds[0];
      return (
        <>
          <div className="flex items-center gap-2">
            <Eye className="cursor-pointer" onClick={() => setOpen(true)} />
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Credentials</DialogTitle>
              </DialogHeader>
              <div>
                <p>
                  <strong>Username:</strong> {credentials?.username}
                </p>
                <p>
                  <strong>Password:</strong> {credentials?.password}
                </p>
              </div>
            </DialogContent>
          </Dialog>
        </>
      );
    },
  },
];

const SearchByDomainTable = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [domain, setDomain] = useState("");
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string>("");
  // This handler could later trigger an API request with the entered domain.
  const handleSearch = async () => {
    try {
      const result = await fetchInfections(domain); // Call server action
      setData(result.data); // Store the fetched data
      setError(""); // Reset error if data is fetched
    } catch (err) {
      setError("Error fetching infections data");
    }
  };

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <PrivateRoute>
      <div className="w-full px-4">
        <h1 className="text-2xl font-semibold mb-6">
          Domain Vulnerability Search
        </h1>

        {/* Domain Input Form */}
        <div className="mb-6">
          <Input
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="Enter domain to search"
            className="w-full"
          />
          <Button onClick={handleSearch} className="mt-4 w-full">
            Search
          </Button>
        </div>
        {!data && !data?.length ? (
          <DomainSearchInfo />
        ) : (
          <div>
            <div className="flex items-center py-4">
              <Input
                placeholder="Filter by username..."
                value={
                  (table.getColumn("username")?.getFilterValue() as string) ??
                  ""
                }
                onChange={(event) =>
                  table
                    .getColumn("username")
                    ?.setFilterValue(event.target.value)
                }
                className="max-w-sm"
              />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="ml-auto">
                    Columns <ChevronDown />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Data Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="h-24 text-center"
                      >
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-end space-x-2 py-4">
              <div className="flex-1 text-sm text-muted-foreground">
                {table.getFilteredSelectedRowModel().rows.length} of{" "}
                {table.getFilteredRowModel().rows.length} row(s) selected.
              </div>
              <div className="space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        )}
        {/* Optional: Filter for Domain Column */}
      </div>
    </PrivateRoute>
  );
};

export default SearchByDomainTable;
