import { Table } from "@tanstack/react-table"

import { SearchInput } from "../ui/search-input"


interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <SearchInput
          placeholder="Search.."
          value={table.getColumn("name")?.getFilterValue() as string || ""}
          onChange={(e) => {
            table.getColumn("name")?.setFilterValue(e.target.value)
          }}
          className="w-full lg:w-[250px]"
        />
      </div>
    </div>
  )
}
