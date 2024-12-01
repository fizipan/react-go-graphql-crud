import { ColumnDef } from "@tanstack/react-table"
import { ProductColumnDef } from "../types/table"
import { DataTableColumnHeader } from "@/components/datatable/data-table-header"
import { DataTableRowActions } from "./row-actions"

export const columns: ColumnDef<ProductColumnDef>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Name"
      />
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Price"
      />
    ),
  },
  {
    accessorKey: "stock",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Stock"
      />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
