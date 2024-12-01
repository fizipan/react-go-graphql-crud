import { useNavigate } from "react-router-dom"

import { LoginForm } from "@/features/auth/components/login-form"
import { AuthLayout } from "@/components/layouts/auth-layout"

export const LoginRoute = () => {

  const navigate = useNavigate()

  return (
    <AuthLayout title="Login">
      <LoginForm
        onSuccess={() =>
          navigate("/app", {
            replace: true,
          })
        }
      />
    </AuthLayout>
  )
}
