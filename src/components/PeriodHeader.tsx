import { Header } from "./Header";
import { Period } from "./Period";

export function PeriodHeader({ id, startDate, endDate, toPresent, introduction, ...headerProps }: Period & React.Attributes) {
  return (
    <>
      <header>
        <Header {...headerProps}  />
        <Period {...{ id, startDate, endDate, toPresent }} />
      </header>
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
