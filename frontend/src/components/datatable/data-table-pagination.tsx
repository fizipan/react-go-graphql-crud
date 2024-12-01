import {
  ChevronsLeftIcon,
  ChevronLeftIcon,
  ChevronsRightIcon,
  ChevronRightIcon,
} from "lucide-react"
import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import useTableSearchParams from "@/hooks/use-table-search-params"

interface DataTablePaginationProps<TData> {
  table: Table<TData>
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  const { setPageSize, setPageIndex } = useTableSearchParams()
  return (
    <div className="flex items-center justify-center lg:justify-end">
      <div className="flex flex-col items-center space-y-6 lg:flex-row lg:space-x-8 lg:space-y-0">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page:</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              setPageIndex(0)
              table.setPageIndex(0)
              setPageSize(Number(value))
              table.setPageSize(Number(value))
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden size-8 p-0 lg:flex"
            onClick={() => {
              setPageIndex(0)
              table.setPageIndex(0)
            }}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeftIcon className="size-4" />
          </Button>
          <Button
            variant="outline"
            className="size-8 p-0"
            onClick={() => {
              setPageIndex(table.getState().pagination.pageIndex - 1)
              table.previousPage()
            }}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="size-4" />
          </Button>
          <Button
            variant="outline"
            className="size-8 p-0"
            onClick={() => {
              setPageIndex(table.getState().pagination.pageIndex + 1)
              table.nextPage()
            }}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="size-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden size-8 p-0 lg:flex"
            onClick={() => {
              setPageIndex(table.getPageCount() - 1)
              table.setPageIndex(table.getPageCount() - 1)
            }}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRightIcon className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
