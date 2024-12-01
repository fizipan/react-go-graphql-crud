import * as React from "react"

import { Head } from "../seo"

type ContentLayoutProps = {
  children: React.ReactNode
  title: string
}

export const ContentLayout = ({ children, title }: ContentLayoutProps) => {
  return (
    <>
      <Head title={title} />
      <div className="pb-12 pt-4">{children}</div>
    </>
  )
}
