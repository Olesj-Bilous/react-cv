import { ChangeEvent, useCallback, useState } from 'react'
import { dateToMonthInput, monthInputToDate } from "../../utils/dateConverters";

export function OptionalMonthInput({ state: [date, setDate] }: {
  state: HookedValue<Date | undefined>
}) {
  const [disabled, setDisabled] = useState(!date)
  const disable = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (!disabled)
        setDate(undefined)
      setDisabled(!disabled)
    },
    [disabled]
  )
  return <div className="month-input">
    <MonthInput state={[date ?? new Date(), setDate]} disabled={disabled} />
    <input type="checkbox" checked={!disabled} onChange={disable} />
  </div>
}

export function MonthInput({ state: [date, setDate], disabled }: {
  state: HookedValue<Date>
  disabled?: boolean
}) {
  const hm = dateToMonthInput(date)
  const [month, setMonth] = [
    dateToMonthInput(date),
    useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        const conversion = monthInputToDate(e.target.value)
        if (conversion)
          setDate(conversion)
      },
      []
    )
  ]
  return <input type="month" disabled={disabled} value={month} onChange={setMonth} />
}