import { DeepRequired, toToggle } from "../../models/initScheme";
import { PeriodEdit, PeriodEditProps } from "../../models/periodScheme"
import { Editable } from "../editable/Editable";
import { HeaderLevelContext } from "./factory.Header";
import { PeriodHeader } from "./Header.Period";

export function PeriodHeaderControl({ map:{ startDate, endDate, toPresent, ...header }, display, control, create }: {
  map: HookedMap<Required<PeriodEdit>>
  display: HeaderProps & { period: string }
} & {
  control: EditControl
  create?: boolean
}) {
  const toggled = toToggle<HeaderProps & { period: PeriodEditProps }, HeaderProps & { period: string }>({
    edit: {
      ...header,
      period: {
        startDate,
        endDate,
        toPresent
      }
    },
    display
  })
  return (
    <header>
      <Editable {...{ ...control, create }}>
        <HeaderLevelContext.Provider value={{ level: 4 }} >
          <div className="period">
            <PeriodHeader {...{
              ...toggled
            }} />
          </div>
        </HeaderLevelContext.Provider>
      </Editable>
    </header>
  )
}
