import { useZustand } from "../hooks/useZustand"
import { EditIconicItem, AddIconicItem, IconicItemControl } from "./items/IconicItem"
import { DateFormatContext } from "./items/Period"
import { EditPeriodHeader } from "./headers/Header.Period.Edit"
import { AddPeriodHeader } from "./headers/Header.Period.Add"
import { EditRatedSkill, AddRatedSkill } from "./items/RatedSkill"
import { Section } from "./Section"


export interface ProfileSections {
  iconicItems: SectionArray<Model>
  ratedSkills: SectionArray<Model>
  periods: SectionArray<Model>
}

const components = {
  iconicItems: [ EditIconicItem, AddIconicItem ] as [React.FC<Model>, React.FC<{eraId:string}>],
  ratedSkills: [EditRatedSkill, AddRatedSkill] as [React.FC<Model>, React.FC<{ eraId: string }>],
  periods: [EditPeriodHeader, AddPeriodHeader] as [React.FC<Model>, React.FC<{ eraId: string }>]
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
    
    const sections = profileSections[key]
    const [Component, AddComponent] = components[key]

    const i = counters[key]++
    const props = sections[i]
    if (props)
      content.push(
        <Section {...{
          key: `${key}/${i}`,
          Component,
          AddComponent,
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
