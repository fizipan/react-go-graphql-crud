import { Row } from "@tanstack/react-table"
import React from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { ProductColumnSchema } from "../types/table"
import { EllipsisVertical } from "lucide-react"
import { DeleteProduct } from "./delete-product"
import { UpdateProduct } from "./update-product"

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const product = ProductColumnSchema.parse(row.original)

  const [state, setState] = React.useState<string | null>(null)

  const closeModal = () => setState(null)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex size-8 p-0 data-[state=open]:bg-muted"
          >
            <EllipsisVertical className="size-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => setState("edit")}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer text-red-500 hover:!text-red-600"
              onClick={() => setState("delete")}
            >
              Delete
            </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <UpdateProduct
        productData={product}
        isOpen={state === "edit"}
        setIsOpen={closeModal}
      />
      <DeleteProduct
        productId={product.id}
        isOpen={state === "delete"}
        setIsOpen={closeModal}
      />
    </>
  )
}
