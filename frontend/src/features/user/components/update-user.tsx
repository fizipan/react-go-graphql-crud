import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { UserColumnDef } from "../types/table"
import { useUpdateUserSchemaTranslation } from "../types/form"
import { Input } from "@/components/ui/input"
import { useUpdateUser } from "../api/update-user"
import { PasswordInput } from "@/components/ui/password-input"


type UpdateUserProps = {
  userData: UserColumnDef
  isOpen: boolean
  setIsOpen: (value: boolean) => void
}

export const UpdateUser = ({
  userData,
  isOpen,
  setIsOpen,
}: UpdateUserProps) => {
  const updateUserSchema = useUpdateUserSchemaTranslation()

  const form = useForm({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  useEffect(() => {
    form.reset(userData)
  }, [userData, form])

  const [updateUser, { loading }] = useUpdateUser({userId: userData.id})

  async function onSubmit(values: z.infer<typeof updateUserSchema>) {
    try {
      await updateUser({
        variables: {
          input: {
            name: values.name,
            email: values.email,
            password: values.password || "",
          }
        },
      })
      toast.success("User updated successfully")
    }
    catch (error) {
      console.error(error)
      toast.error("Failed to update user")
    } finally {
      form.reset()
      setIsOpen(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="p-0">
        <DialogHeader className="px-6 pb-2 pt-6">
          <DialogTitle>
            Edit User
          </DialogTitle>
          <DialogDescription>
            Edit the name of the pod
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[400px]">
          <div className="px-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                id="update-user-form"
              >
                <div className="space-y-4">
                  <div className="mb-6 space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={loading}
                              placeholder="Enter the name of the user"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Email
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={loading}
                              placeholder="Enter the email of the user"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Password
                          </FormLabel>
                          <FormControl>
                            <PasswordInput
                              {...field}
                              disabled={loading}
                              placeholder="Enter the password of the user"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </ScrollArea>
        <DialogFooter className="p-6">
          <DialogClose className="mr-4">
            Cancel
          </DialogClose>
          <Button
            type="submit"
            disabled={loading}
            form="update-user-form"
          >
           {loading ? "Updating..." : "Update"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
