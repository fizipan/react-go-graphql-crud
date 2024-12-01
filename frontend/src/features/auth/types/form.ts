import { z } from "zod"

export const loginInputSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
})

export const useLoginSchemaTranslation = () => {

  return z.object({
    username: z
      .string()
      .min(1),
    password: z
      .string()
      .min(1),
  })
}

export type LoginRequest = z.infer<typeof loginInputSchema>

export const refreshTokenInputSchema = z.object({
  refresh_token: z.string(),
})

export type RefreshTokenRequest = z.infer<typeof refreshTokenInputSchema>
