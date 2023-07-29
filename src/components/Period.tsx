import { createContext, useContext } from "react";

export const DateSettingsContext = createContext<null | {
  locales: Intl.LocalesArgument
  present: string
}>(null)

export const DateFormatContext = createContext <null | {
  formatOptions: Intl.DateTimeFormatOptions
}>(null)

export function Period({ startDate, endDate, toPresent, id }:Model & PeriodProps & React.Attributes) {
  const settings = useContext(DateSettingsContext)
  if (settings == null)
    throw new Error('No value was provided for DateSettingsContext')
  
  const options = useContext(DateFormatContext)
  if (options == null)
    throw new Error('No value was provided for DateFormatContext')

  const end = (toPresent && settings.present)
    || (endDate && endDate.toLocaleDateString(settings.locales, options.formatOptions))
  
  return (
    <div className="date">
      {`${startDate.toLocaleDateString(settings.locales, options.formatOptions)}`}
      {end && ` - ${end}`}
    </div>
  )
}
