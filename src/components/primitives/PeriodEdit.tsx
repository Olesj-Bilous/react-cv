import { ChangeEvent, memo, useCallback, useState, useMemo} from 'react'
import { dateToMonthInput, displayPeriod, monthInputToDate } from "../../utils/dateConverters";
import { useDateFormatContext, useDateSettingsContext } from "../../contexts/Date.Context";
import { useEditableContext } from '../../contexts/Editable.Context';
import { entoggleMapEdit } from '../editable/entoggle';
import { OptionalMonthInput } from './MonthInput';

export function PeriodEdit({ startDate, endDate }: HookedMap<PeriodProps>) {
  return <div className="period">
    <OptionalMonthInput state={startDate}/>
    <OptionalMonthInput state={endDate} />
  </div>
} 

export function DisplayPeriod({ startDate, endDate }: PeriodProps) {
  const settings = useDateSettingsContext()
  const { formatOptions } = useDateFormatContext()
  const period = displayPeriod(settings, formatOptions, { startDate, endDate })
  return <div className="period">{ period }</div>
}

export const PeriodToggle = entoggleMapEdit({
  Edit: PeriodEdit,
  Display: DisplayPeriod
})
