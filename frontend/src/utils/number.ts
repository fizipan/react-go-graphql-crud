export const formatInputNumber = (e: React.FormEvent<HTMLInputElement>) => {
  const input = e.target as HTMLInputElement
  // Hapus karakter non-digit
  const value = input.value.replace(/\D/g, "")
  // Tambahkan koma sebagai pemisah ribuan
  const formattedValue = value.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  // Set nilai input yang diformat
  input.value = formattedValue
}

export const formatNumber = (value: number) => {
  return new Intl.NumberFormat("id-ID").format(value)
}

export const parseNumber = (value: string) => {
  const parsedValue = value.replace(/\D/g, "")
  return parsedValue
}

export const parseFloating = (value: string) => {
  return parseFloat(value.replace(/\D/g, ""))
}
