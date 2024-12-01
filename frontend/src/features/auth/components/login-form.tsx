import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"

import { useLoginSchemaTranslation } from "../types/form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { PasswordInput } from "@/components/ui/password-input"

type LoginFormProps = {
  onSuccess: () => void
}

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const loginSchema = useLoginSchemaTranslation()

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })


  async function onSubmit(values: z.infer<typeof loginSchema>) {
    console.log(values)
    onSuccess()
  }

  return (
    <div>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Username
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter your username"
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
                      placeholder="Enter your password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="!mt-8 w-full"
            >
              Login
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
