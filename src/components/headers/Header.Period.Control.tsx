import { PeriodEdit, PeriodEditProps, PeriodSet } from "../../models/periodScheme"
import { Editable } from "../editable/Editable";
import { liquifyMap } from "../editable/entoggle";
import { HeaderLevelContext } from "./factory.Header";
import { PeriodHeader } from "./Header.Period";

export function PeriodHeaderControl({ map:{ startDate, endDate, ...header }, control, create }: {
  map: HookedMap<PeriodSet>
  control: EditControl
  create?: boolean
}) {
  return (
    <header>
      <Editable {...{ ...control, create }}>
        <HeaderLevelContext.Provider value={{ level: 4 }} >
          <div className="period">
            <PeriodHeader {...{
              ...liquifyMap(header),
              epilogue: {
                startDate,
                endDate
              }
            }} />
          </div>
        </HeaderLevelContext.Provider>
      </Editable>
    </header>
  )
}
