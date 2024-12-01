import { z } from "zod"

export const ProductColumnSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
  stock: z.number(),
})

export type ProductColumnDef = z.infer<typeof ProductColumnSchema>