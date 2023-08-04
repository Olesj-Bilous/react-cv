
import { EditToggleContext } from "../../contexts/EditContext";
import { useLocalEditor } from "../../hooks/useLocalEditor";
import { useZustand } from "../../hooks/useZustand";
import { Editable } from "../edit/EditControl";
import { EditPeriod, EditPeriodToggle } from "../edit/EditPeriod";
import { EditTextToggle, EditTextareaToggle } from "../edit/EditText";
import { Period, useDateFormatContext, useDateSettingsContext } from "../items/Period";
import { headerFactory, HeaderLevelContext } from "./Header";

export const PeriodHeader = headerFactory({
  Title: EditTextToggle,
  Subtitle: EditTextToggle,
  Introduction: EditTextareaToggle,
  Epilogue: EditPeriodToggle
})

export function PeriodHeaderControl({ id }: Model & React.Attributes) {
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
  } = useLocalEditor({ modelSetter: periodSetter })
  
  return (
    <Editable {...control}>
      <HeaderLevelContext.Provider value={{ level: 4 }} >
        <PeriodHeader {...{
          title: {
            display: {
              display: title
            },
            edit: setTitle
          },
          subtitle: {
            display: {
              display: subtitle
            },
            edit: setSubtitle
          },
          introduction: {
            display: {
              display: introduction
            },
            edit: setIntroduction
          },
          epilogue: {
            display: {
              display: period
            },
            edit: {
              startDate, endDate, toPresent
            }
          }
        }} />
      </HeaderLevelContext.Provider>
    </Editable>
  )
}
