import { useZustand } from "../hooks/useStore"
import { IconicItem } from "./IconicItem"
import { DateFormatContext } from "./Period"
import { PeriodHeader } from "./PeriodHeader"
import { RatedSkill } from "./RatedSkill"
import { TitledArray } from "./TitledArray"


export interface ProfileSections {
  iconicItems: TitledArrayMap<IconicItem>
  ratedSkills: TitledArrayMap<RatedSkill>
  periods: TitledArrayMap<Period>
}

export interface ProfileProps {
  order: (keyof ProfileSections)[]
}

const components = {
  iconicItems: IconicItem,
  ratedSkills: RatedSkill,
  periods: PeriodHeader
}

export function Profile({ order }: ProfileProps & React.Attributes) {
  const sections = useZustand(store => store.getProfileSections())
  const counters: {
    [Key in keyof ProfileSections]: number
  } = {
    iconicItems: 0,
    ratedSkills: 0,
    periods: 0
  }

  let content: JSX.Element[] = []
  if (!order.length)
    order.push(...Object.getOwnPropertyNames(sections) as (keyof ProfileSections)[])
  for (const key of order) {
      // casting Component to a function accepting a union of parameters rather than a union of functions, each accepting different parameters,
      //  avoids code duplication by pseudogenerising Component
      //  but introduces the danger of calling Component with the wrong parameters type
      // we ensure that only the right type of parameters are passed to Component by retrieving them from sections by key
      //  unfortunately, TypeScript is not capable of recognising this
    const { map, order: sectionOrder } = sections[key]
    const Component = components[key] as ({ ...props }: (IconicItem | RatedSkill | Period) & React.Attributes) => JSX.Element

    if (!sectionOrder.length)
      sectionOrder.push(...Object.getOwnPropertyNames(map))

    const props = map[sectionOrder[counters[key]++]]
    if (props)
    content.push(
      <TitledArray<IconicItem | RatedSkill | Period> key={`${key}/${counters[key]}`} {...{
        Component,
        ...props
      }} />
    )
  }

  return (
    <div className="profile">
      <DateFormatContext.Provider value={{
        formatOptions: {
          dateStyle: 'short'
        }
      }}>
          {content}
      </DateFormatContext.Provider>
    </div>
  )
}
