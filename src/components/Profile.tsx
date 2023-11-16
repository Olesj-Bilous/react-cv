import { useZustand } from "../hooks/useZustand"
import { EditIconicItem, AddIconicItem, IconicItemControl } from "./items/IconicItem"
import { DateFormatContext } from "../contexts/Date.Context"
import { EditPeriodHeader } from "./headers/Header.Period.Edit"
import { AddPeriodHeader } from "./headers/Header.Period.Add"
import { EditRatedSkill, AddRatedSkill } from "./items/RatedSkill"
import { Section } from "./Section"
import { RatingScaleContext } from "../contexts/Rating.Context"
import { mapProfileSections } from "../models/mapProfileSections"

const components = {
  iconicItems: [EditIconicItem, AddIconicItem] as [React.FC<Model>, React.FC<{ eraId: string }>],
  ratedSkills: [EditRatedSkill, AddRatedSkill] as [React.FC<Model>, React.FC<{ eraId: string }>],
  periods: [EditPeriodHeader, AddPeriodHeader] as [React.FC<Model>, React.FC<{ eraId: string }>]
}

export function Profile() {
  const profileSections = useZustand(store => store.getProfileSections())
  const map = mapProfileSections(profileSections, (key, props) => {
    const [Component, AddComponent] = components[key]
    return <Section {...{
      key: `${key}/${props.id}`,
      Component,
      AddComponent,
      ...props
    }} />
  })

  return (
    <DateFormatContext.Provider value={{
      formatOptions: {
        dateStyle: 'short'
      }
    }}>
      <RatingScaleContext.Provider value={{ scale: 5 }}>
        <div className="profile">
          {map}
        </div>
      </RatingScaleContext.Provider>
    </DateFormatContext.Provider>
  )
}
