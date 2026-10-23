"use client";

import { useMemo, useState, type ReactNode } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export type Column<T> = {
  key: string;
  header: string;
  render: (row: T) => ReactNode;
};

type DataTableProps<T> = {
  data: T[];
  columns: Column<T>[];
  getSearchValue: (row: T) => string;
  searchPlaceholder?: string;
  pageSize?: number;
};

export function DataTable<T extends { id: number }>({
  data,
  columns,
  getSearchValue,
  searchPlaceholder = "Search...",
  pageSize = 5,
}: DataTableProps<T>) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(pageSize);

  const filteredData = useMemo(() => {
    return data.filter((row) =>
      getSearchValue(row).toLowerCase().includes(search.toLowerCase()),
    );
  }, [data, search, getSearchValue]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / limit));

  const currentPage = Math.min(page, totalPages);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * limit,
    currentPage * limit,
  );

  const start = filteredData.length === 0 ? 0 : (currentPage - 1) * limit + 1;

  const end = Math.min(currentPage * limit, filteredData.length);

  return (
    <div className="space-y-4">
      {/* Search and page size */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Input
          placeholder={searchPlaceholder}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="sm:max-w-sm"
        />

        <select
          value={limit}
          onChange={(e) => {
            setLimit(Number(e.target.value));
            setPage(1);
          }}
          className="h-10 rounded-md border bg-background px-3 text-sm"
          aria-label="Rows per page"
        >
          <option value={5}>5 per page</option>
          <option value={10}>10 per page</option>
          <option value={20}>20 per page</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-md border">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-4 py-3 text-left font-medium"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {paginatedData.map((row) => (
              <tr
                key={row.id}
                className="border-t transition-colors hover:bg-muted/30"
              >
                {columns.map((column) => (
                  <td key={column.key} className="px-4 py-3">
                    {column.render(row)}
                  </td>
                ))}
              </tr>
            ))}

            {paginatedData.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="h-28 text-center text-muted-foreground"
                >
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {start}–{end} of {filteredData.length} records
        </p>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Previous
          </Button>

          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>

          <Button
            variant="outline"
            size="sm"
            disabled={currentPage >= totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
