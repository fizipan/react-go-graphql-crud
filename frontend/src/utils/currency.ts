export const formatCurrency = ({
  value,
  currencyCode,
}: {
  value: number
  currencyCode: string
}) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: currencyCode,
  }).format(value)
}