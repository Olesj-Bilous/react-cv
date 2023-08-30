

export function displayPeriodFromInput(
  settings: {
    locales: Intl.LocalesArgument,
    present: string
  },
  formatOptions: Intl.DateTimeFormatOptions,
  { startDate, endDate, ...period }: InputModel<Period, keyof Omit<Period, keyof PeriodProps>>
) {
  if (!startDate) return ''

  return displayPeriod(settings, formatOptions, {
    ...period,
    startDate: monthInputToDate(startDate) ?? new Date(),
    endDate: monthInputToDate(endDate)
  })
}

export function displayPeriod(
  { locales, present }: {
    locales: Intl.LocalesArgument, present: string
  },
  formatOptions: Intl.DateTimeFormatOptions,
  { startDate, endDate, toPresent }: PeriodProps
) {
  const end = (toPresent && present)
    || (endDate && displayMonth(endDate, locales, formatOptions))

  return `${displayMonth(startDate, locales, formatOptions)}${end ? ` - ${end}` : ''}`
}

export function displayMonth(date: Date, locales: Intl.LocalesArgument, formatOptions: Intl.DateTimeFormatOptions) {
  if (formatOptions.dateStyle === 'short') {
    return `${date.getMonth() + 1}/'${date.getFullYear().toString().slice(2)}`
  }
  if (formatOptions.dateStyle === 'long') {
    return `${date.toLocaleDateString(locales, { month: 'short' })} ${date.getFullYear()}`
  }
  return date.toLocaleDateString(locales, formatOptions)
}

export function dateToMonthInput(date: Date): string {
  const month = date.getMonth() + 1
  return `${date.getFullYear()}-${month < 10 && 0}${month}`
}

export function monthInputToDate(input?: string) {
  if (!input)
    return

  const [year, month] = input.split('-').map(s => parseInt(s))

  if (!year || isNaN(year) || !month || isNaN(month) || month < 1 || 12 < month)
    return
  
  return new Date(year, month - 1)
}
