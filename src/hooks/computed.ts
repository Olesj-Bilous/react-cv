import { filterMap, mapMap, mapToArray } from '../utils/mapQueries'
import { ProfileSections } from '../components/Profile'
import { eventsMapToSectionArray } from '../models/eventsMapToSectionArray'

export const computed = <T extends ModelStore>(get: () => T) => ({
  getSelectedProfile() {
    return get().profiles.models['0']
  },
  getSelectedEras() {
    const [eras] = filterMap(get().eras.models, era => era.profile === this.getSelectedProfile().id)
    return eras
  },
  getMainEraFilter() {
    const mainTitles = ['Experience', 'Projects']
    return filterMap(this.getSelectedEras(), era => mainTitles.some(title => title === era.title))
  },
  getMainPeriods(): SectionArray<FeaturedPeriod> {
    const sections = eventsMapToSectionArray<Period>(
      get().periods.models,
      this.getMainEraFilter()[0],
      this.getSelectedProfile()
    )
    return sections.map(section => ({
      ...section,
      items: section.items.map(period => ({
        ...period,
        features: mapToArray(
          filterMap(
            get().periodFeatures.models,
            feature => feature.period === period.id
          )[0]
        ).sort((a, b) => a.order - b.order).map(feature => ({
          ...feature,
          period
        }))
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
      profileSections[sectionKey as keyof ProfileSections] = eventsMapToSectionArray<IconicItem & RatedSkill & Period>(
        profileModelMaps[sectionKey as keyof ProfileSections].models as ModelMap<IconicItem & RatedSkill & Period>['models'],
        this.getMainEraFilter()[1],
        this.getSelectedProfile()
      )
    }

    return profileSections as ProfileSections
  }
})

export type StoreComputed = ReturnType<typeof computed>
