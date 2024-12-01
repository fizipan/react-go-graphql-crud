import { Helmet, HelmetData } from "react-helmet-async"

type HeadProps = {
  title?: string
  description?: string
}

const helmetData = new HelmetData({})

export const Head = ({
  title = "",
  description = "React Graphql Typescript",
}: HeadProps = {}) => {
  return (
    <Helmet
      helmetData={helmetData}
      title={title ? `${title} |  Graphql` : undefined}
      defaultTitle="React |  Graphql"
    >
      <meta name="description" content={description} />
    </Helmet>
  )
}
