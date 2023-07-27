import { TitledArray } from "./TitledArray"
import { PeriodHeader } from "./PeriodHeader"
import { DateFormatContext } from "./Period"


export interface MainProps {
  map: TitledArrayMap<Period & { features: string[] }>
}

export function Main({ map: { map, order } }: MainProps & React.Attributes) {
  if (!order.length)
    order.push(...Object.getOwnPropertyNames(map))
  const content: JSX.Element[] = []
  for (const key of order) {
    if (map[key]) {
      const { title, items, order: arrayOrder } = map[key]
      content.push(
        <TitledArray {...{
          title,
          items,
          order: arrayOrder,
          Component: PeriodHeader
        }} />
      )
    }
  }
  return (
    <DateFormatContext.Provider value={{formatOptions: {
      dateStyle: 'long'
    }}}>
      {content}
    </DateFormatContext.Provider>
  )
}
