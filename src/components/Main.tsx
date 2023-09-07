import { Section } from "./Section"
import { DateFormatContext } from "../contexts/Date.Context"
import { PeriodFeatures } from "./items/Period.Features"
import { useZustand } from "../hooks/useZustand"
import { AddPeriodHeader } from "./headers/Header.Period.Add"

export function Main() {
  const sections = useZustand(store => store.getMainPeriods())
  return (
    <main>
      <DateFormatContext.Provider value={{formatOptions: {
        dateStyle: 'long'
      }
      }}>
          {
            sections.map((section, i) => <Section {...{
              key: i,
              ...section,
              Component: PeriodFeatures,
              AddComponent: AddPeriodHeader
            }} />)
          }
      </DateFormatContext.Provider>
    </main>
  )
}
