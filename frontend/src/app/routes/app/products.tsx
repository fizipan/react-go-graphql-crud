import { ContentLayout } from "@/components/layouts/content-layout"
import { ProductsList } from "@/features/product/components/product-list"

export const ProductsRoute = () => {
  return (
    <ContentLayout title="Products">
      <h1 className="mb-6 text-2xl font-bold">Products</h1>
      <ProductsList />
    </ContentLayout>
  )
}
