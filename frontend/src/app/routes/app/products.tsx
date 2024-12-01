import { ContentLayout } from "@/components/layouts/content-layout"
import { CreateProduct } from "@/features/product/components/create-product"
import { ProductsList } from "@/features/product/components/product-list"

export const ProductsRoute = () => {
  return (
    <ContentLayout title="Products">
      <div className="mb-8 flex items-center justify-between">
      <h1 className="mb-6 text-2xl font-bold">Products</h1>
        <CreateProduct />
      </div>
      <ProductsList />
    </ContentLayout>
  )
}
