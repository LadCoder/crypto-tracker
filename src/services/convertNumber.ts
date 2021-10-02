export const convertToPercent = (num: number): string => `${num.toFixed(1)}%`

export const convertToCurrency = (currency: string, num: number): string => {
  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
    minimumFractionDigits: 0
  })

  return currencyFormatter.format(num)
}
