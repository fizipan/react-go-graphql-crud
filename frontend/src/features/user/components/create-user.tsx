import { zodResolver } from "@hookform/resolvers/zod"
import { CirclePlus } from "lucide-react"
import { useState } from "react"
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
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useCreateUserSchemaTranslation } from "../types/form"
import { Input } from "@/components/ui/input"
import { useCreateUser } from "../api/create-user"
import { PasswordInput } from "@/components/ui/password-input"

export const CreateUser = () => {
  const createUserSchema = useCreateUserSchemaTranslation()

  const [openDialog, setOpenDialog] = useState(false)

  const form = useForm({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: "",
      email: "",
      password: ""
    },
  })

  const [addUser, { loading }] = useCreateUser()

  async function onSubmit(values: z.infer<typeof createUserSchema>) {
    try {
      await addUser({
        variables: {
          input: values,
        },
      })
      toast.success("User created successfully")
      form.reset()
    } catch (error) {
      toast.error("Failed to create user")
      console.error(error)
    }
    setOpenDialog(false)
  }

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button>
          <CirclePlus className="size-5" />
          Add User
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0">
        <DialogHeader className="px-6 pb-2 pt-6">
          <DialogTitle>
            Add User
          </DialogTitle>
          <DialogDescription>
            Add a new user to the site
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[400px]">
          <div className="px-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                id="create-user-form"
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
                              placeholder="Enter user name"
                              disabled={loading}
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
                              placeholder="Enter user email"
                              disabled={loading}
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
                              placeholder="Enter user password"
                              disabled={loading}
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
            form="create-user-form"
            disabled={loading}
          >
            {loading ? "Loading..." : "Create User"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
