import { useZustand } from "../hooks/useZustand"
import { IconicItem } from "./items/IconicItem"
import { DateFormatContext } from "./items/Period"
import { EditPeriodHeader } from "./headers/Header.Period.Edit"
import { RatedSkill } from "./items/RatedSkill"
import { Section } from "./Section"


export interface ProfileSections {
  iconicItems: SectionArray<IconicItem>
  ratedSkills: SectionArray<RatedSkill>
  periods: SectionArray<Period>
}

const components = {
  iconicItems: IconicItem,
  ratedSkills: RatedSkill,
  periods: EditPeriodHeader
}

export function Profile() {
  const profileSections = useZustand(store => store.getProfileSections())
  const { iconicItems, periods, ratedSkills } = profileSections

  const content: JSX.Element[] = []
  const counters = {
    iconicItems: 0,
    periods: 0,
    ratedSkills: 0
  }
  while (counters.iconicItems < iconicItems.length
    || counters.periods < periods.length
    || counters.ratedSkills < ratedSkills.length) {
    const key = [
      {
        item: iconicItems[counters.iconicItems]?.order ?? Number.POSITIVE_INFINITY,
        key: 'iconicItems' as keyof ProfileSections
      }, {
        item: periods[counters.periods]?.order ?? Number.POSITIVE_INFINITY,
        key: 'periods' as keyof ProfileSections
      }, {
        item: ratedSkills[counters.ratedSkills]?.order ?? Number.POSITIVE_INFINITY,
        key: 'ratedSkills' as keyof ProfileSections
      }
    ].reduce(
      (previous, current) => current.item < previous.item
        ? current : previous
    ).key
      // casting Component to 
      //  a function accepting a union of parameters 
      //  rather than a union of functions,
      //   each of which accept different parameters,
      //  avoids code duplication by pseudogenerising Component
      //  but introduces the danger of calling Component with the wrong parameters type
      // we ensure that only the right type of parameters are passed to Component by retrieving them from sections by key
      //  unfortunately, TypeScript does not recognise this
    const sections = profileSections[key]
    const Component = components[key] as ({ ...props }: (IconicItem | RatedSkill | Period) & React.Attributes) => JSX.Element

    const i = counters[key]++
    const props = sections[i]
    if (props)
      content.push(
        <Section<IconicItem | RatedSkill | Period> {...{
          key: `${key}/${i}`,
          itemKey: key,
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
