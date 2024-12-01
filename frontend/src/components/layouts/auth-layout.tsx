import * as React from "react"

import { Head } from "@/components/seo"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"


type LayoutProps = {
  children: React.ReactNode
  title: string
}

export const AuthLayout = ({ children, title }: LayoutProps) => {


  // const navigate = useNavigate()

  // React.useEffect(() => {
  //   if (user.data) {
  //     navigate("/app", {
  //       replace: true,
  //     })
  //   }
  // }, [user.data, navigate])

  return (
    <>
      <Head title={title} />
      <div className="mx-4 flex h-screen items-center justify-center">
        <Card className="mx-auto w-[28rem]">
          <CardHeader>
            <CardTitle className="text-2xl">
              Login
            </CardTitle>
            <CardDescription>
              Login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>{children}</CardContent>
        </Card>
      </div>
    </>
  )
}
