import { inputToDate } from "../utils/converters"


export const queries = <T extends ModelStore>(get: () => T) => ({
  getModel<K extends keyof ModelStore>(type: K, id: string) {
    const gotten = get()
    return get()[type].models[id] as ModelType<StoredModel<K>>
  },
  getHeaderProps(type: 'periods' | 'profiles' | 'eras', id: string): HeaderProps {
    switch (type) {
      case 'eras': {
        const { title } = this.getModel(type, id)
        return { title }
      }
      case 'periods': {
        const { title, subtitle, introduction } = this.getModel(type, id)
        return {
          title,
          subtitle,
          introduction
        }
      }
      case 'profiles': {
        const { firstName, lastName, profession: subtitle, description: introduction } = this.getModel(type, id)
        const title = `${firstName} ${lastName}`
        return {
          title,
          subtitle,
          introduction
        }
      }
    }
  },
  getPeriodDateString(settings:{locales: Intl.LocalesArgument,present:string}, formatOptions: Intl.DateTimeFormatOptions, id: string) {
    return displayPeriod(settings, formatOptions, this.getModel('periods', id))
  }
})

export function displayPeriodFromInput(
  settings: {
    locales: Intl.LocalesArgument,
    present: string
  },
  formatOptions: Intl.DateTimeFormatOptions,
  period: InputModel<Period, keyof Omit<Period, keyof PeriodProps>>
) {
  const startDate = inputToDate(period.startDate)
  if (!startDate) return ''

  return displayPeriod(settings, formatOptions, {
    ...period,
    startDate,
    endDate: inputToDate(period.endDate)
  })
}

export function displayPeriod(settings: { locales: Intl.LocalesArgument, present: string }, formatOptions: Intl.DateTimeFormatOptions, period: PeriodProps) {
  const { startDate, endDate, toPresent } = period

  const end = (toPresent && settings.present)
    || (endDate && endDate.toLocaleDateString(settings.locales, formatOptions))

  return `${startDate.toLocaleDateString(settings.locales, formatOptions)}${end ? ` - ${end}` : ''}`
}

export type StoreQueries = ReturnType<typeof queries>
