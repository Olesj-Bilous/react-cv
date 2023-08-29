

export function dateToInput(date: Date): string {
  const month = date.getMonth() + 1
  return `${date.getFullYear()}-${month < 10 ? `0${month}` : month }`
}

export function inputToDate(date?: string) {
  if (!date) return
  const [year, month] = date.split('-').map(s => parseInt(s))

  if (!year || isNaN(year) || !month || isNaN(month) || month < 1 || 12 < month)
    return
  
  return new Date(year, month - 1)
}
