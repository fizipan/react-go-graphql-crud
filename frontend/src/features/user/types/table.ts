import { z } from "zod"

export const UserColumnSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
})

export type UserColumnDef = z.infer<typeof UserColumnSchema>
