import { ContentLayout } from "@/components/layouts/content-layout"
import { useRouteError } from "react-router-dom"


export type RouteError = {
  message: string
  status?: number
  statusText?: string
}

export default function ErrorPage() {
  const error = useRouteError() as RouteError
  console.error(error)


  return (
    <ContentLayout title="Error">
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-4xl font-bold text-red-500">Error</h1>
        <p className="text-lg mt-4">{error.message}</p>
      </div>
    </ContentLayout>
  )
}
