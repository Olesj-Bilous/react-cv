
import { useModelEditor } from "../../hooks/useModelEditor";
import { useZustand } from "../../hooks/useZustand";
import { useDateFormatContext, useDateSettingsContext } from "../../contexts/Date.Context"
import { PeriodHeaderControl } from "./Header.Period.Control";

export function EditPeriodHeader({ id }: Model) {
  const settings = useDateSettingsContext()
  const { formatOptions } = useDateFormatContext()

  const { set } = useZustand(store => store.periodControl(settings, formatOptions).set({ id }))
  
  const { control, map } = useModelEditor({modelSetter: set})

  return <PeriodHeaderControl {...{
    control,
    map
  }} />
}