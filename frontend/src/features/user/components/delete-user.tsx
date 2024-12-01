import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useDeleteUser } from "../api/delete-user"

type DeleteUserProps = {
  userId: string
  isOpen: boolean
  setIsOpen: (value: boolean) => void
}

export const DeleteUser = ({
  userId,
  isOpen,
  setIsOpen,
}: DeleteUserProps) => {
  const [deleteUser, { loading }] = useDeleteUser({ userId })

  const deleteAction = async () => {
    try {
      await deleteUser()
      toast.success("User deleted successfully")
    } catch (error) {
      toast.error("Failed to delete user")
      console.error(error)
    } finally {
      setIsOpen(false)
    }
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this user?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              disabled={loading}
              onClick={deleteAction}
            >
             {loading ? "Loading..." : "Delete"}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
