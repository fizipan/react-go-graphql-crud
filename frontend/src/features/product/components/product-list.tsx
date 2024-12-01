import { DataTable } from "@/components/datatable/data-table"

import { Card, CardContent } from "@/components/ui/card"
import { columns } from "./columns"
import { useGetProducts } from "../api/get-products"

export const ProductsList = () => {
  
  const productsQuery = useGetProducts()
  
  const products = productsQuery.data?.getProducts || []

  if (!products) {
    return null
  }

  return (
      <Card className="w-full">
        <CardContent className="pb-14 pt-8">
          <DataTable
            data={products}
            columns={columns}
            isLoading={productsQuery.loading}
            pageCount={1}
          />
        </CardContent>
      </Card>
  )
}
