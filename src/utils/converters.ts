

export function dateToInput(date: Date): string {
  const month = date.getMonth()
  const day = date.getDate()
  return `${date.getFullYear()}-${month < 10 ? `0${month}` : month }-${day < 10 ? `0${day}` : day}`
}

export function inputToDate(date?: string) {
  if (!date) return
  const [year, month, day] = date.split('-').map(s => parseInt(s))

  if (isNaN(year)
    || isNaN(month) || month < 0 || 12 < month
    || isNaN(day) || day < 0 || 31 < day)
    return
  
  return new Date(year, month, day)
}
