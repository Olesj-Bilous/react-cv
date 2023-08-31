
import { useModelEditor } from "../../hooks/useModelEditor";
import { useHookedEditor } from "../../hooks/useModelEditor copy";
import { useZustand } from "../../hooks/useZustand";
import { useDateFormatContext, useDateSettingsContext } from "../items/Period";
import { PeriodHeaderControl } from "./Header.Period.Control";

export function EditPeriodHeader({ id }: Model) {
  const settings = useDateSettingsContext()
  const { formatOptions } = useDateFormatContext()

  const { set, display } = useZustand(store => store.periodControl(settings, formatOptions).set({ id }))
  
  const { control, map } = useHookedEditor({modelSetter: set})

  return <PeriodHeaderControl {...{
    control,
    map,
    display
  }} />
}