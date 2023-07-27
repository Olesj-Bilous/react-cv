

export function filterMap<T>(map: KeyMap<T>, filter: (item: T) => boolean) {
  let positive: KeyMap<T> = {}
  let negative: KeyMap<T> = {}
  for (const key in map) {
    if (filter(map[key]))
      positive[key] = map[key]
    else {
      negative[key] = map[key]
    }
  }
  return [positive, negative] as [positive: KeyMap<T>, negative: KeyMap<T>]
}

export function mapContains<T>(map: KeyMap<T>, filter: (item: T) => boolean, matchAll?: boolean) {
  const keys: string[] = []
  for (const key in map) {
    if (filter(map[key])) {
      keys.push(key)
      if (!matchAll)
        return keys
    }
  }
  return keys
}

export function mapToArray<T, F = T>(map: KeyMap<T>) {
  const array: (T | F)[] = []
  for (const key in map)
    array.push(map[key])
  return array
}

