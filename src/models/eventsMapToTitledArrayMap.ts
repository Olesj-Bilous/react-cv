import { filterMap, mapToArray } from '../utils/mapQueries'

export function eventsMapToTitledArrayMap<V extends EraEvent, M = {}>(
  events: KeyMap<ModelType<V> & M>,
  eras: KeyMap<ModelType<Era>>,
  profile: Profile
) {
  const titledArray: TitledArrayMap<V & M> = {
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
    }) as V & M)
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
