import { Editable } from "../editable/Editable";
import { HeaderLevelContext } from "./factory.Header";
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
