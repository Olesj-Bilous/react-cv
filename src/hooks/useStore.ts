import { useState } from 'react'

import { initStore } from '../models/initStore'
import { filterMap, mapToArray } from '../utils/mapQueries'
import { ProfileSections } from '../components/Profile'

export function useStore() {
  let store = {}
  const item = localStorage.getItem('cv-store')
  if (item) {
    store = JSON.parse(item)
  }
  
  const [{
    profiles,
    eras,
    iconicItems,
    ratedSkills,
    periods
  }] = useState(Object.assign(initStore, store))

  const profile = profiles.models['0']

  const [filteredEras] = filterMap(eras.models, era => era.profile === '0')

  const mainTitles = ['Experience', 'Projects']
  const [mainEras, profileEras] = filterMap(filteredEras, era => mainTitles.some(title => title === era.title))

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
    iconicItems,
    ratedSkills,
    periods
  }

  for (const eraKey in profileEras) {
    const era = profileEras[eraKey]

    for (const sectionKey in profileSections) {
      const { models } = profileModels[sectionKey as keyof ProfileSections]
      const [filteredModels] = filterMap<ModelType<IconicItem | RatedSkill | Period>>(
        models as KeyMap<ModelType<IconicItem | RatedSkill | Period>>,
        model => model.era === era.id
      )
      const items = mapToArray(filteredModels).map(model => ({
        ...model,
        era: {
          ...era,
          profile
        }
      }));
      if (items.length) {
        (profileSections[sectionKey as keyof ProfileSections].map as KeyMap<TitledArray<IconicItem | RatedSkill | Period>>)[era.title] = {
          title: era.title,
          items,
          order: []
        }
      }
    }
  }
  
  let mainPeriods: TitledArrayMap<Period & {features: string[]}> = {
    map: {},
    order: []
  }
  for (const eraKey in mainEras) {
    const era = mainEras[eraKey]
    const [filteredPeriods] = filterMap(periods.models, period => period.era === era.id)
    const items = mapToArray(filteredPeriods).map(period => ({
      ...period,
      features: [] as string[],
      era: {
        ...era,
        profile
      }
    }))
    if (items.length) {
      mainPeriods.map[era.title] = {
        title: era.title,
        items,
        order: []
      }
    }
  }

  function eventsMapToTitledArray<V extends EraEvent>(
    events: KeyMap<ModelType<V>>,
    eras: KeyMap<ModelType<Era>>,
    profile: Profile
  ) {
    const titledArray: TitledArrayMap<V> = {
      map: {},
      order: []
    }
    for (const key in eras) {
      const era = eras[key]
      const [filteredEvents] = filterMap(events, event => event.era === era.id)
      const items = mapToArray(filteredEvents).map(event => ({
        ...event,
        era: {
          ...era,
          profile
        }
      } as V))
      if (items.length) {
        titledArray.map[era.title] = {
          title: era.title,
          items,
          order: []
        }
      }
    }
    return titledArray
  }

  return {
    profile,
    profileSections,
    mainPeriods
  }
}
