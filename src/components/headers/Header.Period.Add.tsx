import { displayPeriodFromInput } from "../../utils/dateConverters";
import { useModelEditor } from "../../hooks/useModelEditor";
import { useZustand } from "../../hooks/useZustand";
import { useDateFormatContext, useDateSettingsContext } from "../items/Period";
import { PeriodHeaderControl } from "./Header.Period.Control";

export function AddPeriodHeader({ eraId }: { eraId: string }) {
  const setter = useZustand(store => store.addPeriod(eraId))
  const {
    control,
    content: {
      title: setTitle, subtitle: setSubtitle, introduction: setIntroduction,
      startDate, endDate, toPresent
    }
  } = useModelEditor({ modelSetter: setter, toggled: true })

  const settings = useDateSettingsContext()
  const { formatOptions } = useDateFormatContext()
  const period = displayPeriodFromInput(settings, formatOptions, {
    startDate: startDate.value, endDate: endDate.value, toPresent: toPresent.value
  })

  return <PeriodHeaderControl {...{
    create: true,
    control,
    title: {
      display: setTitle.value,
      edit: setTitle
    },
    subtitle: {
      display: setSubtitle.value,
      edit: setSubtitle
    },
    introduction: {
      display: setIntroduction.value,
      edit: setIntroduction
    },
    period: {
      display: period,
      edit: {
        startDate,
        endDate,
        toPresent
      }
    }
  }} />
}

