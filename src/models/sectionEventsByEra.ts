import { filterMap } from '../utils/mapQueries'

export function sectionEventsByEra(
  events: KeyMap<ModelType<EraEvent>>,
  eras: KeyMap<ModelType<Era>>
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
    const { id, order } = era
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
