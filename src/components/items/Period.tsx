import { useZustand } from "../../hooks/useZustand";
import { createContext, useContext } from "react";

import { EditPeriodContext } from "./Period.Features";
import { contextFactory } from "../../contexts/contextFactory";

export const [DateSettingsContext, useDateSettingsContext] = contextFactory<{
  locales: Intl.LocalesArgument
  present: string
}>('DateSettings')

export const [DateFormatContext, useDateFormatContext] = contextFactory<{
  formatOptions: Intl.DateTimeFormatOptions
}>('DateFormat')

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
