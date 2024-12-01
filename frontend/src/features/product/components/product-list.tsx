// import { useDebounce } from "use-debounce"

import { DataTable } from "@/components/datatable/data-table"

import { Card, CardContent } from "@/components/ui/card"
import { columns } from "./columns"
// import useTableSearchParams from "@/hooks/use-table-search-params"

export const ProductsList = () => {
  // const { getSearch, getPageIndex, getPageSize } = useTableSearchParams()
  // const [search] = useDebounce(getSearch(), 1000)


  // const productsQuery = useProducts({
  //   search,
  //   pageIndex: getPageIndex() + 1,
  //   pageSize: getPageSize(),
  //   siteId: activeSite || 1,
  // })

  // const products = productsQuery.data?.data || []
  // const pageCount = productsQuery.data?.meta.last_page || 0

  const products = [
    {
      id: 1,
      name: "Product 1",
      price: 100,
      stock: 10,
    },
    {
      id: 2,
      name: "Product 2",
      price: 200,
      stock: 20,
    },
    {
      id: 3,
      name: "Product 3",
      price: 300,
      stock: 30,
    },
  ]

  if (!products) return null

  return (
      <Card className="w-full">
        <CardContent className="pb-14 pt-8">
          <DataTable
            data={products}
            columns={columns}
            isLoading={false}
            pageCount={1}
          />
        </CardContent>
      </Card>
  )
}
