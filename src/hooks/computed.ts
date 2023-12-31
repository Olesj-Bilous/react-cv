import { filterMap } from '../utils/mapQueries'
import { ProfileSections } from '../models/mapProfileSections'
import { sectionEventsByEra } from '../models/sectionEventsByEra'

export const computed = <T extends ModelStore>(get: () => T) => ({
  getSelectedProfile(): Profile {
    return get().profiles.models['0']
      ?? { id: '0', profession: '', description: '', img: '', firstName: '', lastName: '' }
  },
  getSelectedEras() {
    const [eras] = filterMap(get().eras.models, era => era.profile === this.getSelectedProfile()?.id)
    return eras
  },
  getMainEraFilter() {
    const mainTitles = ['Ervaring', 'Projecten', 'Experience', 'Projects']
    return filterMap(this.getSelectedEras(), era => mainTitles.some(title => title === era.title))
  },
  getMainPeriods(): SectionArray<Model & {features: string[]}> {
    const periods = get().periods.models
    const [eras] = this.getMainEraFilter()
    const sections = sectionEventsByEra(
      periods,
      eras
    )
    return sections.map(section => ({
      id: section.id,
      items: section.items.map(period => ({
        ...period,
        features: Object.values(
          filterMap(
            get().periodFeatures.models,
            feature => feature.period === period.id
          )[0]
        ).sort(
          (a, b) => a.order - b.order
        ).map(feature => feature.id)
      }))
    }))
  },
  getProfileSections() {
    const profileSections: Partial<ProfileSections> = {}

    const profileModelMaps = {
      iconicItems: get().iconicItems,
      ratedSkills: get().ratedSkills,
      periods: get().periods
    }

    for (const sectionKey in profileModelMaps) {
      profileSections[sectionKey as keyof ProfileSections] = sectionEventsByEra(
        profileModelMaps[sectionKey as keyof ProfileSections].models as ModelMap<IconicItem & RatedSkill & Period>['models'],
        this.getMainEraFilter()[1]
      )
    }

    return profileSections as ProfileSections
  }
})

export type StoreComputed = ReturnType<typeof computed>
