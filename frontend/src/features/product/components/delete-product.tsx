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

type DeleteProductProps = {
  productId: number
  isOpen: boolean
  setIsOpen: (value: boolean) => void
}

export const DeleteProduct = ({
  productId,
  isOpen,
  setIsOpen,
}: DeleteProductProps) => {
  // const deleteProductMutation = useDeleteProduct({
  //   siteId,
  //   mutationConfig: {
  //     onSuccess: () => {
  //       toast.success(
  //         t("ModalDelete.SuccessMessage", { name: "Category Menu" })
  //       )
  //     },
  //   },
  // })

  // const deleteAction = () => {
  //   deleteProductMutation.mutateAsync({ productId, siteId })
  // }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this product?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              onClick={() => {
                // deleteAction()
                console.log(productId)
                toast.success("Category Menu deleted")
                setIsOpen(false)
              }}
            >
              Delete
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
