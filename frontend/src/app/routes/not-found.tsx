import { useNavigate } from "react-router-dom"

import { Head } from "@/components/seo"
import { Button } from "@/components/ui/button"

export const NotFoundRoute = () => {
  const navigate = useNavigate()
  return (
    <>
      <Head title="Not Found" />
      <div className="h-svh w-full">
        <div className="mx-auto flex size-full flex-col items-center justify-center gap-2">
          <h1 className="text-[7rem] font-bold leading-tight">404</h1>
          <div className="w-80 text-center">
            <span className="font-medium">
              The page you are looking for does not exist.
            </span>
            <p className="text-center text-sm text-muted-foreground">
              You may have mistyped the address or the page may have moved.
            </p>
          </div>
          <div className="mt-6 flex gap-4">
            <Button variant="outline" onClick={() => navigate(-1)}>
              Go Back
            </Button>
            <Button variant="secondary" onClick={() => navigate("/")}>
              Go Home
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
