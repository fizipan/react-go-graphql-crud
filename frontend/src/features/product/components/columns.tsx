import { ColumnDef } from "@tanstack/react-table"
import { ProductColumnDef } from "../types/table"
import { DataTableColumnHeader } from "@/components/datatable/data-table-header"
import { DataTableRowActions } from "./row-actions"
import { formatCurrency } from "@/utils/currency"
import { formatNumber } from "@/utils/number"

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
    cell: ({ row }) => formatCurrency({value: row.original.price, currencyCode: "IDR"}),
  },
  {
    accessorKey: "stock",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Stock"
      />
    ),
    cell: ({ row }) => formatNumber(row.original.stock),
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
