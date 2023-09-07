import { DeepRequired, toToggle } from "../../models/initScheme";
import { PeriodEdit, PeriodEditProps } from "../../models/periodScheme"
import { Editable } from "../editable/Editable";
import { liquifyMap } from "../editable/entoggle";
import { HeaderLevelContext } from "./factory.Header";
import { PeriodHeader } from "./Header.Period";

export function PeriodHeaderControl({ map:{ startDate, endDate, ...header }, control, create }: {
  map: HookedMap<PeriodEdit>
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
              period: {
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
