import { TitledArray } from "./TitledArray"
import { PeriodHeader } from "./PeriodHeader"
import { DateFormatContext } from "./Period"
import { PeriodFeatures } from "./PeriodFeatures"
import { HeaderLevelContext } from "./Header"
import { useZustand } from "../hooks/useStore"


export interface MainProps {
  map: TitledArrayMap<Period & { features: string[] }>
}

export function Main() {
  const {map,order} = useZustand(store => store.getMainPeriods())
  if (!order.length)
    order.push(...Object.getOwnPropertyNames(map))
  const content: JSX.Element[] = []
  for (const key of order) {
    if (map[key]) {
      const { title, items, order: arrayOrder } = map[key]
      content.push(
        <TitledArray {...{
          key,
          title,
          items,
          order: arrayOrder,
          Component: PeriodFeatures
        }} />
      )
    }
  }
  return (
    <main>
      <DateFormatContext.Provider value={{formatOptions: {
        dateStyle: 'long'
      }
      }}>
        <HeaderLevelContext.Provider value={{ level: 4 }}>  
          {content}
        </HeaderLevelContext.Provider>
      </DateFormatContext.Provider>
    </main>
  )
}
