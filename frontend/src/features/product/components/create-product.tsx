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
import { useCreateProductSchemaTranslation } from "../types/form"
import { Input } from "@/components/ui/input"
import { useCreateProduct } from "../api/create-product"
import { formatInputNumber, parseFloating, parseNumber } from "@/utils/number"

export const CreateProduct = () => {
  const createProductSchema = useCreateProductSchemaTranslation()

  const [openDialog, setOpenDialog] = useState(false)

  const form = useForm({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",
      price: "",
      stock: ""
    },
  })

  const [addProduct, { loading }] = useCreateProduct()

  async function onSubmit(values: z.infer<typeof createProductSchema>) {
    try {
      await addProduct({
        variables: {
          input: {
            name: values.name,
            price: parseFloating(values.price),
            stock: parseNumber(values.stock),
          }
        },
      })
      toast.success("Product created successfully")
      form.reset()
    } catch (error) {
      toast.error("Failed to create product")
      console.error(error)
    }
    setOpenDialog(false)
  }

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button>
          <CirclePlus className="size-5" />
          Add Product
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0">
        <DialogHeader className="px-6 pb-2 pt-6">
          <DialogTitle>
            Add Product
          </DialogTitle>
          <DialogDescription>
            Add a new product to the site
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[400px]">
          <div className="px-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                id="create-product-form"
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
                              placeholder="Enter product name"
                              disabled={loading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Price
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              inputMode="numeric"
                              onInput={formatInputNumber}
                              placeholder="Enter product price"
                              disabled={loading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="stock"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Stock
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              inputMode="numeric"
                              onInput={formatInputNumber}
                              placeholder="Enter product stock"
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
            form="create-product-form"
            disabled={loading}
          >
            {loading ? "Loading..." : "Create Product"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
