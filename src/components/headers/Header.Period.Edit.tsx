
import { useModelEditor } from "../../hooks/useModelEditor";
import { useZustand } from "../../hooks/useZustand";
import { useDateFormatContext, useDateSettingsContext } from "../items/Period";
import { PeriodHeaderControl } from "./Header.Period.Control";

export function EditPeriodHeader({ id }: Model) {
  const settings = useDateSettingsContext()
  const { formatOptions } = useDateFormatContext()

  const period = useZustand(store => store.getPeriodDateString(settings, formatOptions, id))
  const { title, subtitle, introduction } = useZustand(store => store.getHeaderProps('periods', id))

  const periodSetter = useZustand(store => store.periodSetter(id))
  const {
    control,
    content: {
      title: setTitle, subtitle: setSubtitle, introduction: setIntroduction,
      startDate, endDate, toPresent
    }
  } = useModelEditor({ modelSetter: periodSetter })

  return <PeriodHeaderControl {...{
    control,
    title: {
      display: title,
      edit: setTitle
    },
    subtitle: {
      display: subtitle,
      edit: setSubtitle
    },
    introduction: {
      display: introduction,
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