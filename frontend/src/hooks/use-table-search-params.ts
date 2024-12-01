import { useSearchParams } from "react-router-dom"

type UseTableSearchParamsReturn = {
  searchParams: URLSearchParams
  setSearch: (value: string) => void
  setPageIndex: (page: number) => void
  setPageSize: (pageSize: number) => void
  setFilter: (key: string, value: string) => void
  getSearch: () => string
  getPageIndex: () => number
  getPageSize: () => number
  getFilter: (key: string) => string
}

const useTableSearchParams = (): UseTableSearchParamsReturn => {
  const [searchParams, setSearchParams] = useSearchParams()

  const updateSearchParam = (key: string, value: string | number | null) => {
    if (value) {
      searchParams.set(key, value.toString())
    } else {
      searchParams.delete(key)
    }
    setSearchParams(searchParams, { replace: true })
  }

  const setSearch = (value: string) => updateSearchParam("search", value)
  const setPageIndex = (page: number) => updateSearchParam("pageIndex", page)
  const setPageSize = (pageSize: number) =>
    updateSearchParam("pageSize", pageSize)
  const setFilter = (key: string, value: string) =>
    updateSearchParam(`filter_${key}`, value)

  const getSearch = () => searchParams.get("search") || ""
  const getPageIndex = () => Number(searchParams.get("pageIndex")) || 0
  const getPageSize = () => Number(searchParams.get("pageSize")) || 10
  const getFilter = (key: string) => searchParams.get(`filter_${key}`) || ""

  return {
    searchParams,
    setSearch,
    setPageIndex,
    setPageSize,
    setFilter,
    getSearch,
    getPageIndex,
    getPageSize,
    getFilter,
  }
}

export default useTableSearchParams
