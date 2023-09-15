import { dateToMonthInput, displayPeriod, monthInputToDate } from "../utils/dateConverters"
import { DeepRequired, initScheme } from "./initScheme"

export type PeriodEditProps = {
  [K in keyof PeriodProps]: DateToStringConversion<PeriodProps[K]>
}

export type PeriodSet = HeaderProps & PeriodProps

export type PeriodEdit = Required<HeaderProps & PeriodEditProps>

export type PeriodDisplay = HeaderProps & { period: string }

export const periodDefaults = (): PeriodSet => ({
  title: '',
  subtitle: undefined,
  introduction: undefined,
  startDate: undefined,
  endDate: undefined
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
) => ({ startDate, endDate, ...header }: PeriodSet
): PeriodDisplay => ({
  period: displayPeriod(settings, formatOptions, {
    startDate: startDate,
    endDate: endDate
  }),
  ...header
})

export const periodScheme = (settings: {
  locales: Intl.LocalesArgument;
  present: string;
}, formatOptions: Intl.DateTimeFormatOptions) => initScheme({
  defaults: periodDefaults,
  edit: model => model,
  accept: model => model,
  display: toPeriodDisplay(settings, formatOptions)
})

export const iconicItemScheme = initScheme({
  defaults: () => ({
    icon: '',
    item: ''
  }),
  edit: model => model,
  accept: model => model,
  display: model => model
})

export const ratedSkillScheme = initScheme({
  defaults: () => ({
    skill: '',
    rating: 0
  }),
  edit: model => model,
  accept: model => model,
  display: model => model
})
