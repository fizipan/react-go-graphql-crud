import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ProductColumnDef } from "../types/table";
import { useUpdateProductSchemaTranslation } from "../types/form";
import { Input } from "@/components/ui/input";
import {
  formatInputNumber,
  formatNumber,
  parseFloating,
  parseNumber,
} from "@/utils/number";
import { useUpdateProduct } from "../api/update-product";

type UpdateProductProps = {
  productData: ProductColumnDef;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

export const UpdateProduct = ({
  productData,
  isOpen,
  setIsOpen,
}: UpdateProductProps) => {
  const updateProductSchema = useUpdateProductSchemaTranslation();

  const form = useForm({
    resolver: zodResolver(updateProductSchema),
    defaultValues: {
      name: "",
      price: "",
      stock: "",
    },
  });

  useEffect(() => {
    form.reset({
      name: productData.name,
      price: formatNumber(productData.price),
      stock: formatNumber(productData.stock),
    });
  }, [productData, form]);

  const [updateProduct, { loading }] = useUpdateProduct({
    productId: productData.id,
  });

  async function onSubmit(values: z.infer<typeof updateProductSchema>) {
    try {
      await updateProduct({
        variables: {
          input: {
            name: values.name,
            price: parseFloating(values.price),
            stock: parseNumber(values.stock),
          },
        },
      });
      toast.success("Product updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update product");
    } finally {
      form.reset();
      setIsOpen(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="p-0">
        <DialogHeader className="px-6 pb-2 pt-6">
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>Edit the name of the pod</DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[400px]">
          <div className="px-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                id="update-product-form"
              >
                <div className="space-y-4">
                  <div className="mb-6 space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={loading}
                              placeholder="Enter the name of the product"
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
                          <FormLabel>Price</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={loading}
                              onInput={formatInputNumber}
                              placeholder="Enter the price of the product"
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
                          <FormLabel>Stock</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={loading}
                              onInput={formatInputNumber}
                              placeholder="Enter the stock of the product"
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
          <DialogClose className="mr-4">Cancel</DialogClose>
          <Button type="submit" disabled={loading} form="update-product-form">
            {loading ? "Updating..." : "Update"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
