import { Row } from "@tanstack/react-table"
import React from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { EllipsisVertical } from "lucide-react"
import { UserColumnSchema } from "../types/table"
import { UpdateUser } from "./update-user"
import { DeleteUser } from "./delete-user"

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const user = UserColumnSchema.parse(row.original)

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
      <UpdateUser
        userData={user}
        isOpen={state === "edit"}
        setIsOpen={closeModal}
      />
      <DeleteUser
        userId={user.id}
        isOpen={state === "delete"}
        setIsOpen={closeModal}
      />
    </>
  )
}
