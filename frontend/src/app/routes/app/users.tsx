import { ContentLayout } from "@/components/layouts/content-layout"
import { CreateUser } from "@/features/user/components/create-user"
import { UsersList } from "@/features/user/components/user-list"

export const UsersRoute = () => {
  return (
    <ContentLayout title="Users">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="mb-6 text-2xl font-bold">Users</h1>
        <CreateUser />
      </div>
      <UsersList />
    </ContentLayout>
  )
}
