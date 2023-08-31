import { useZustand } from "../../hooks/useZustand";
import { useDateFormatContext, useDateSettingsContext } from "../items/Period";
import { PeriodHeaderControl } from "./Header.Period.Control";
import { useHookedEditor } from "../../hooks/useModelEditor copy";

export function AddPeriodHeader({ eraId }: { eraId: string }) {
  const settings = useDateSettingsContext()
  const { formatOptions } = useDateFormatContext()

  const {add, preview} = useZustand(store => store.periodControl(settings, formatOptions).add({eraId}))
  const {
    control,
    map,
    local
  } = useHookedEditor({ modelSetter: add, toggled: true })

  return <PeriodHeaderControl {...{
    create: true,
    control,
    map,
    display: preview(() => local)
  }} />
}

