import { filterMap, mapMap, mapToArray } from '../utils/mapQueries'
import { ProfileSections } from '../components/Profile'
import { eventsMapToTitledArrayMap } from './eventsMapToTitledArrayMap'

export const computed = <T extends ModelStore>(get: () => T) => ({
  getSelectedProfile() {
    return get().profiles.models['0']
  },
  getSelectedEras() {
    const [eras] = filterMap(get().eras.models, era => era.profile === this.getSelectedProfile().id)
    return eras
  },
  getMainErasFilter() {
    const mainTitles = ['Experience', 'Projects']
    return filterMap(this.getSelectedEras(), era => mainTitles.some(title => title === era.title))
  },
  getFeaturedPeriods() {
    return mapMap<ModelType<Period>, ModelType<Period> & { features: string[] }>(
      get().periods.models,
      period => ({
        ...period,
        features: mapToArray(filterMap(get().periodFeatures.models, feature => feature.period === period.id)[0]).map(
          feature => feature.feature
        )
      })
    )
  },
  getMainPeriods() {
    return eventsMapToTitledArrayMap<Period, { features: string[] }>(
      this.getFeaturedPeriods(),
      this.getMainErasFilter()[0],
      this.getSelectedProfile()
    )
  },
  getProfileSections() {
    const profileSections: ProfileSections = {
      iconicItems: {
        map: {},
        order: []
      },
      ratedSkills: {
        map: {},
        order: []
      },
      periods: {
        map: {},
        order: []
      }
    }

    const profileModels = {
      iconicItems: get().iconicItems,
      ratedSkills: get().ratedSkills,
      periods: get().periods
    }

    for (const sectionKey in profileSections) {
      Object.assign(profileSections[sectionKey as keyof ProfileSections], eventsMapToTitledArrayMap<IconicItem | RatedSkill | Period>(
        profileModels[sectionKey as keyof ProfileSections].models,
        this.getMainErasFilter()[1],
        this.getSelectedProfile()
      ))
    }

    return profileSections
  }
})
