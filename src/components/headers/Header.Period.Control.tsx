
import { EditableContext } from "../../contexts/EditContext";
import { displayPeriod, displayPeriodFromInput } from "../../hooks/queries";
import { useModelEditor } from "../../hooks/useModelEditor";
import { useZustand } from "../../hooks/useZustand";
import { Editable } from "../edit/Editable";
import { EditPeriod, EditPeriodToggle } from "../edit/EditPeriod";
import { EditTextToggle, EditTextareaToggle } from "../edit/EditText";
import { useDateFormatContext, useDateSettingsContext } from "../items/Period";
import { headerFactory, HeaderLevelContext } from "./Header.factory";
import { PeriodHeader } from "./Header.Period";

export function PeriodHeaderControl({ title, subtitle, introduction, period, control, create }: {
  title: EditToggleProp<string>
  subtitle: EditToggleProp<string | undefined>
  introduction: EditToggleProp<string | undefined>
  period: EditToggleProp<string, Period, keyof Omit<Period, keyof PeriodProps>>
} & {
  control: EditControl
  create?: boolean
}) {
  return (
    <header>
      <Editable {...{ ...control, create }}>
        <HeaderLevelContext.Provider value={{ level: 4 }} >
          <div className="period">
            <PeriodHeader {...{
              title,
              subtitle,
              introduction,
              epilogue: period
            }} />
          </div>
        </HeaderLevelContext.Provider>
      </Editable>
    </header>
  )
}