

export function shallowCompare<T extends object>(a: T, b: T) {
  for (const key in a) {
    if (a[key] === b[key])
      continue
    return false
  }
  return true
}
