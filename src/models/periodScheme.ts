import { dateToMonthInput, displayPeriod, monthInputToDate } from "../utils/dateConverters"
import { DeepRequired, initScheme } from "./initScheme"

export type PeriodEditProps = {
  [K in keyof PeriodProps]: DateToStringConversion<PeriodProps[K]>
}

export type PeriodSet = HeaderProps & PeriodProps

export type PeriodEdit = Required<HeaderProps & PeriodEditProps>

export type PeriodDisplay = HeaderProps & { period: string }

export const periodDefaults = (): Required<PeriodSet> => ({
  title: '',
  subtitle: '',
  introduction: '',
  startDate: new Date(),
  endDate: new Date(),
  toPresent: false
})

export const toPeriodEdit = ({ startDate, endDate, ...rest }: Required<PeriodSet>): PeriodEdit => ({
  startDate: dateToMonthInput(startDate),
  endDate: dateToMonthInput(endDate),
  ...rest
})

export const acceptPeriodEdit = ({ startDate, endDate, ...rest }: Partial<PeriodEdit>): Partial<PeriodSet> => ({
  startDate: monthInputToDate(startDate),
  endDate: monthInputToDate(endDate),
  ...rest
})

export const toPeriodDisplay = (
  settings: {
    locales: Intl.LocalesArgument;
    present: string;
  },
  formatOptions: Intl.DateTimeFormatOptions
) => ({ startDate, endDate, toPresent, ...header }: PeriodSet
): PeriodDisplay => ({
  ...header,
  period: displayPeriod(settings, formatOptions, {
    startDate: startDate,
    endDate: endDate,
    toPresent: toPresent
  })
})

export const periodScheme = (settings: {
  locales: Intl.LocalesArgument;
  present: string;
}, formatOptions: Intl.DateTimeFormatOptions) => initScheme({
  defaults: periodDefaults,
  edit: toPeriodEdit,
  accept: acceptPeriodEdit,
  display: toPeriodDisplay(settings, formatOptions)
})
