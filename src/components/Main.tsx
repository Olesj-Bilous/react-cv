import { Section } from "./Section"
import { DateFormatContext } from "./items/Period"
import { PeriodFeatures } from "./items/Period.Features"
import { useZustand } from "../hooks/useZustand"
import { AddPeriodHeader } from "./headers/Header.Period.Add"


export interface MainProps {
  map: SectionArray<Period & { features: string[] }>
}

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
              itemKey: 'periods',
              ...section,
              Component: PeriodFeatures,
              AddComponent: AddPeriodHeader
            }} />)
          }
      </DateFormatContext.Provider>
    </main>
  )
}
