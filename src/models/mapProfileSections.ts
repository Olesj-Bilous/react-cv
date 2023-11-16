

export interface ProfileSections {
  iconicItems: OrderedSection[]
  ratedSkills: OrderedSection[]
  periods: OrderedSection[]
}

export function mapProfileSections<T>(
  sections: ProfileSections,
  mapping: <K extends keyof ProfileSections>(key: K, item: OrderedSection) => T
): T[] {
  const { iconicItems, periods, ratedSkills } = sections
  const map: T[] = []
  const counters = {
    iconicItems: 0,
    periods: 0,
    ratedSkills: 0
  }

  while (counters.iconicItems < iconicItems.length
    || counters.periods < periods.length
    || counters.ratedSkills < ratedSkills.length
  ) {
    const ordering: { order: number, key: keyof ProfileSections }[] = [
      {
        order: iconicItems[counters.iconicItems]?.order ?? Number.POSITIVE_INFINITY,
        key: 'iconicItems'
      }, {
        order: periods[counters.periods]?.order ?? Number.POSITIVE_INFINITY,
        key: 'periods'
      }, {
        order: ratedSkills[counters.ratedSkills]?.order ?? Number.POSITIVE_INFINITY,
        key: 'ratedSkills'
      }
    ]

    const key = ordering.reduce(
      (previous, current) => current.order < previous.order || sections[previous.key].length <= counters[previous.key]
        ? current : previous
    ).key

    const props = sections[key][counters[key]++]
    if (props) {
      map.push(mapping(key, props))
    }
  }

  return map
}
