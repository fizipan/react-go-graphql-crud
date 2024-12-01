import { useMemo } from "react"
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom"

import { AppRoot } from "./routes/app/root"
import ErrorPage from "./routes/error"
import { Spinner } from "@/components/ui/spinner"

const createRouter = () =>
  createBrowserRouter(
    [
      {
        path: "/",
        hydrateFallbackElement: <Spinner />,
        element: <Navigate to="/app" replace />,
      },
      {
        path: "/auth/login",
        hydrateFallbackElement: <Spinner />,
        errorElement: <ErrorPage />,
        lazy: async () => {
          const { LoginRoute } = await import("./routes/auth/login")
          return { Component: LoginRoute }
        },
      },
      {
        path: "/app",
        hydrateFallbackElement: <Spinner />,
        errorElement: <ErrorPage />,
        element: (
            <AppRoot />
        ),
        children: [
          {
            hydrateFallbackElement: <Spinner />,
            errorElement: <ErrorPage />,
            children: [
              {
                path: "",
                lazy: async () => {
                  const { DashboardRoute } = await import(
                    "./routes/app/dashboard"
                  )
                  return {
                    Component: DashboardRoute,
                  }
                },
              },
              {
                path: "products",
                lazy: async () => {
                  const { ProductsRoute } = await import(
                    "./routes/app/products"
                  )
                  return {
                    Component: ProductsRoute,
                  }
                },
              },
              {
                path: "users",
                lazy: async () => {
                  const { UsersRoute } = await import(
                    "./routes/app/users"
                  )
                  return {
                    Component: UsersRoute,
                  }
                },
              },
            ],
          },
        ],
      },
      {
        path: "*",
        lazy: async () => {
          const { NotFoundRoute } = await import("./routes/not-found")
          return { Component: NotFoundRoute }
        },
      },
    ],
    {
      basename: "/",
      future: {
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_relativeSplatPath: true,
        v7_skipActionErrorRevalidation: true,
        v7_partialHydration: true,
      },
    }
  )

export const AppRouter = () => {

  const router = useMemo(() => createRouter(), [])

  return <RouterProvider future={{
    v7_startTransition: true,
  }} router={router} />
}
