export function toLocalIsoDate(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function parseLocalIsoDate(value: string) {
  const [year, month, day] = value.split('-').map(Number)
  return new Date(year, month - 1, day)
}

export function addLocalDays(value: string, amount: number) {
  const date = parseLocalIsoDate(value)
  date.setDate(date.getDate() + amount)
  return toLocalIsoDate(date)
}

export function formatChipDate(value: string, today: string) {
  if (value === today) return 'Today'
  return parseLocalIsoDate(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}