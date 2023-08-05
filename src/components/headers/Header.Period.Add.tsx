
import { EditableContext } from "../../contexts/EditContext";
import { displayPeriod, displayPeriodFromInput } from "../../hooks/queries";
import { useModelEditor } from "../../hooks/useModelEditor";
import { useZustand } from "../../hooks/useZustand";
import { Editable } from "../edit/Editable";
import { EditPeriod, EditPeriodToggle } from "../edit/EditPeriod";
import { EditTextToggle, EditTextareaToggle } from "../edit/EditText";
import { useDateFormatContext, useDateSettingsContext } from "../items/Period";
import { headerFactory, HeaderLevelContext } from "./Header.factory";
import { PeriodHeaderControl } from "./Header.Period.Control";

export function AddPeriodHeader({ eraId }: { eraId: string }) {
  const setter = useZustand(store => store.periodAdder(eraId))
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
