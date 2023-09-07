import { useZustand } from "../../hooks/useZustand";
import { useDateFormatContext, useDateSettingsContext } from "../../contexts/Date.Context";
import { PeriodHeaderControl } from "./Header.Period.Control";
import { useModelEditor } from "../../hooks/useModelEditor";

export function AddPeriodHeader({ eraId }: { eraId: string }) {
  const settings = useDateSettingsContext()
  const { formatOptions } = useDateFormatContext()

  const { add } = useZustand(store => store.periodControl(settings, formatOptions).add({ eraId }))
  const {
    control,
    map
  } = useModelEditor({ modelSetter: add, toggled: true })

  return <PeriodHeaderControl {...{
    create: true,
    control,
    map
  }} />
}

