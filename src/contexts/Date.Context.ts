import { defineContext } from "./factory.Context";

export const [DateSettingsContext, useDateSettingsContext] = defineContext<{
  locales: Intl.LocalesArgument
  present: string
}>('DateSettings')

export const [DateFormatContext, useDateFormatContext] = defineContext<{
  formatOptions: Intl.DateTimeFormatOptions
}>('DateFormat')
