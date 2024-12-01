import { DashboardLayout } from "@/components/layouts/dashboard-layout"
import { Spinner } from "@/components/ui/spinner"
import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom"


export const AppRoot = () => {
  const location = useLocation()
  return (
    <DashboardLayout>
      <ErrorBoundary
        key={location.pathname}
        fallback="An error occurred while rendering this page"
      >
        <Suspense
          fallback={
            <div className="flex size-full items-center justify-center">
              <Spinner size="xl" />
            </div>
          }
        >
          <ScrollRestoration />
          <Outlet />
        </Suspense>
      </ErrorBoundary>
    </DashboardLayout>
  )
}
