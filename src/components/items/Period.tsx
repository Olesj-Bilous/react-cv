import { useZustand } from "../../hooks/useZustand";
import { createContext, useContext } from "react";

import { contextFactory } from "../../contexts/factory.Context";

export const [DateSettingsContext, useDateSettingsContext] = contextFactory<{
  locales: Intl.LocalesArgument
  present: string
}>('DateSettings')

export const [DateFormatContext, useDateFormatContext] = contextFactory<{
  formatOptions: Intl.DateTimeFormatOptions
}>('DateFormat')
