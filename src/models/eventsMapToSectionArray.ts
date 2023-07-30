import { filterMap, mapToArray } from '../utils/mapQueries'

export function eventsMapToSectionArray<V extends EraEvent, M = {}>(
  events: KeyMap<ModelType<V> & M>,
  eras: KeyMap<ModelType<Era>>,
  profile: Profile
) {
  const sections: SectionArray<V & M> = []
  for (const key in eras) {
    const era = eras[key]
    const [filteredEvents] = filterMap(events, event => event.era === era.id)
    const items = mapToArray(filteredEvents).map(event => ({
      ...event,
      era: {
        ...era,
        profile
      }
    }) as V & M).sort((a, b) => a.order - b.order)
    const { id, title, order } = era
    if (items.length) {
      sections.push({
        id,
        title,
        order,
        items
      })
    }
  }
  return sections.sort((a, b) => a.order - b.order)
}
