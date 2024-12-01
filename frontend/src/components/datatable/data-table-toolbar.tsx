import { Table } from "@tanstack/react-table"

import useTableSearchParams from "@/hooks/use-table-search-params"
import { SearchInput } from "../ui/search-input"


interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const { getSearch, setSearch, setPageIndex, setPageSize } =
    useTableSearchParams()
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <SearchInput
          placeholder="Search.."
          value={getSearch() || ""}
          onChange={(e) => {
            setPageIndex(0)
            table.setPageIndex(0)
            setPageSize(10)
            table.setPageSize(10)
            setSearch(e.target.value)
          }}
          className="w-full lg:w-[250px]"
        />
      </div>
    </div>
  )
}
