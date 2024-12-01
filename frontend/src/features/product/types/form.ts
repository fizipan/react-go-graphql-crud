import { z } from "zod"

export const createProductInputSchema = z.object({
  name: z.string().min(1),
  price: z.string().min(1),
  stock: z.string().min(1),
})

export const useCreateProductSchemaTranslation = () => {

  return z.object({
    name: z
      .string()
      .min(1, "Name must required"),
    price: z
      .string()
      .min(1, "Price must required"),
    stock: z
      .string()
      .min(1, "Stock must required"),
  })
}

export type CreateProductRequest = z.infer<
  typeof createProductInputSchema
>

export const updateProductInputSchema = z.object({
  name: z.string().min(1),
  price: z.string().min(1),
  stock: z.string().min(1),
})

export const useUpdateProductSchemaTranslation = () => {
  return z.object({
    name: z
      .string()
      .min(1, "Name must required"),
    price: z
      .string()
      .min(1, "Price must required"),
    stock: z
      .string()
      .min(1, "Stock must required"),
  })
}

export type UpdateProductRequest = z.infer<
  typeof updateProductInputSchema
>
