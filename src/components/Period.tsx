import { useZustand } from "../hooks/useZustand";
import { createContext, useContext } from "react";

export const DateSettingsContext = createContext<null | {
  locales: Intl.LocalesArgument
  present: string
}>(null)

export const DateFormatContext = createContext <null | {
  formatOptions: Intl.DateTimeFormatOptions
}>(null)

export function Period({ id }: Model & React.Attributes) {
  const settings = useContext(DateSettingsContext)
  if (settings == null)
    throw new Error('No value was provided for DateSettingsContext')
  
  const options = useContext(DateFormatContext)
  if (options == null)
    throw new Error('No value was provided for DateFormatContext')

  const content = useZustand(store => store.getPeriodDateString(settings, options.formatOptions, id))
  
  return (
    <div className="date">
      {content}
    </div>
  )
}
