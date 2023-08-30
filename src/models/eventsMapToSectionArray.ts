import { filterMap } from '../utils/mapQueries'

export function eventsMapToSections(
  events: KeyMap<ModelType<EraEvent>>,
  eras: KeyMap<ModelType<Era>>,
  profile: Profile
): OrderedSection[] {
  const sections: OrderedSection[] = []
  for (const key in eras) {
    const era = eras[key]
    if (!era) continue
    const [filteredEvents] = filterMap(events, event => event.era === era.id)
    const items = Object.values(filteredEvents).map(event => ({
      id: event.id,
      order: event.order
    })).sort((a, b) => a.order - b.order)
    const { id, title, order } = era
    if (items.length) {
      sections.push({
        id,
        order,
        items
      })
    }
  }
  return sections.sort((a, b) => a.order - b.order)
}
