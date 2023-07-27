import { Header } from "./Header";
import { Period } from "./Period";

export function PeriodHeader({ startDate, endDate, toPresent, introduction, ...headerProps }: Period & React.Attributes) {
  return (
    <>
      <div className="period-header">
        <Header {...headerProps}  />
        <Period {...{ startDate, endDate, toPresent }} />
      </div>
      {
        introduction && (
          <div className="introduction">
            {introduction}
          </div>
        )
      }
    </>
  )
}
