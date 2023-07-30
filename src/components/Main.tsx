import { Section } from "./Section"
import { PeriodHeader } from "./Header.Period"
import { DateFormatContext } from "./Period"
import { PeriodFeatures } from "./PeriodFeatures"
import { HeaderLevelContext } from "./Header"
import { useZustand } from "../hooks/useZustand"


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
              ...section,
              Component: PeriodFeatures
            }} />)
          }
      </DateFormatContext.Provider>
    </main>
  )
}
