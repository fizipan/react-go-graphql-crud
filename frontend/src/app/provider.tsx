import { MainErrorFallback } from "@/components/error/main"
import { Toaster } from "@/components/ui/sonner"
import { Spinner } from "@/components/ui/spinner"
import { client } from "@/lib/react-apollo"
import { ApolloProvider } from "@apollo/client"
import * as React from "react"
import { ErrorBoundary } from "react-error-boundary"
import { HelmetProvider } from "react-helmet-async"

type AppProviderProps = {
  children: React.ReactNode
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <ErrorBoundary FallbackComponent={MainErrorFallback}>
      <React.Suspense
        fallback={
          <div className="flex h-screen w-screen items-center justify-center">
            <Spinner size="xl" />
          </div>
        }
      >
        <HelmetProvider>
          <ApolloProvider client={client}>
              <Toaster />
              {children}
          </ApolloProvider>
        </HelmetProvider>
      </React.Suspense>
    </ErrorBoundary>
  )
}
