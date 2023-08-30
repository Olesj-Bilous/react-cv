

export function filterMap<T>(map: KeyMap<T>, filter: (item: T) => boolean) {
  const positive: KeyMap<T> = {}
  const negative: KeyMap<T> = {}
  for (const key in map) {
    const item = map[key]
    if (!item) continue
    if (filter(item))
      positive[key] = item
    else {
      negative[key] = item
    }
  }
  return [positive, negative] as [positive: KeyMap<T>, negative: KeyMap<T>]
}

export function transformMap<T, V>(map: KeyMap<T>, transform: (item: T) => V) {
  const result: KeyMap<V> = {}
  for (const key in map) {
    const item = map[key]
    if (!item) continue
    result[key] = transform(item)
  }
  return result
}

export function matchingKeys<T>(map: KeyMap<T>, filter: (item: T) => boolean, onlyFirst?: boolean) {
  const keys: string[] = []
  for (const key in map) {
    const item = map[key]
    if (!item) continue
    if (filter(item)) {
      keys.push(key)
      if (onlyFirst)
        return keys
    }
  }
  return keys
}

