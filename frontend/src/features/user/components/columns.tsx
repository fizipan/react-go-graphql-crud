import { ColumnDef } from "@tanstack/react-table"
import { UserColumnDef } from "../types/table"
import { DataTableColumnHeader } from "@/components/datatable/data-table-header"
import { DataTableRowActions } from "./row-actions"

export const columns: ColumnDef<UserColumnDef>[] = [
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
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Email"
      />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
