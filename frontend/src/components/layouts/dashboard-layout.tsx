import { Link, useLocation } from "react-router-dom"
import { AppSidebar } from "../app-sidebar"
import { NProgress } from "../ui/nprogress"
import { Separator } from "../ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../ui/sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  // get path from location
  const  {pathname } = useLocation()
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex h-screen flex-col overflow-x-hidden scrollbar-thin scrollbar-track-background scrollbar-thumb-muted-foreground/40">
        <NProgress />
        <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center gap-2 border-border/40 bg-sidebar-accent/50 backdrop-blur transition-[width,height] ease-linear supports-[backdrop-filter]:bg-sidebar-accent/50">
          <div className="flex flex-1 items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink asChild>
                    <Link to="/app">
                      Home
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="capitalize">
                    {pathname === "/app" ? "Dashboard" : pathname.replace("/app/", "")}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 bg-sidebar-accent/50 p-4 pt-0">
          <div className="min-h-screen flex-1 md:min-h-min">{children}</div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
