import { DataTable } from "@/components/datatable/data-table"

import { Card, CardContent } from "@/components/ui/card"
import { columns } from "./columns"
import { useGetUsers } from "../api/get-users"

export const UsersList = () => {
  
  const usersQuery = useGetUsers()
  
  const users = usersQuery.data?.getUsers || []

  if (!users) {
    return null
  }

  return (
      <Card className="w-full">
        <CardContent className="pb-14 pt-8">
          <DataTable
            data={users}
            columns={columns}
            isLoading={usersQuery.loading}
            pageCount={1}
          />
        </CardContent>
      </Card>
  )
}
