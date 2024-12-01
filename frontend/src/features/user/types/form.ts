import { z } from "zod"

export const createUserInputSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
})

export const useCreateUserSchemaTranslation = () => {

  return z.object({
    name: z
      .string()
      .min(1, "Name must required"),
    email: z
      .string()
      .email("Invalid email format")
      .min(1, "Email must required"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long"),
  })
}

export type CreateUserRequest = z.infer<
  typeof createUserInputSchema
>

export const updateUserInputSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8).optional(),
})

export const useUpdateUserSchemaTranslation = () => {
  return z.object({
    name: z
      .string()
      .min(1, "Name must required"),
    email: z
      .string()
      .email("Invalid email format")
      .min(1, "Email must required"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .optional(),
  })
}

export type UpdateUserRequest = z.infer<
  typeof updateUserInputSchema
>
