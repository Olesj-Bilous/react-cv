

export function filterMap<T>(map: KeyMap<T>, filter: (item: T) => boolean) {
  const positive: KeyMap<T> = {}
  const negative: KeyMap<T> = {}
  for (const key in map) {
    if (filter(map[key]))
      positive[key] = map[key]
    else {
      negative[key] = map[key]
    }
  }
  return [positive, negative] as [positive: KeyMap<T>, negative: KeyMap<T>]
}

export function mapMap<T, V>(map: KeyMap<T>, mapping: (model: T) => V) {
  const result: KeyMap<V> = {}
  for (const key in map) {
    result[key] = mapping(map[key])
  }
  return result
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

