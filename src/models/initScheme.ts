

export interface SchemeArgs<
  T extends object,
  E extends object = T,
  D extends object = E
> {
  defaults: () => T
  edit: (t: T) => E
  accept: (e: Partial<E>) => Partial<T>
  display: (t: T) => D
}

export interface Scheme<
  T extends object,
  E extends object = T,
  D extends object = E
> {
  add: (set: (t: Partial<T>) => void) => HookedModel<E>
  set: (set: (t: Partial<T>) => void, get: () => T) => HookedModel<E>
  display: (get: () => T) => D
  preview: (get: () => E) => D
}

export function initScheme<
  T extends object,
  E extends object = T,
  D extends object = E
>({ defaults, edit, accept, display }: SchemeArgs<T, E, D>): Scheme<T, E, D> {
  const setHook = (set: (t: Partial<T>) => void) => (e: Partial<E>) => set(accept(e)) 
  return {
    add: (set) => [
      edit(defaults()),
      setHook(set)
    ],
    set: (set, get) => {
      return [
      edit(Object.assign({}, defaults(), get())),
      setHook(set)
    ]},
    display: (get) => display(get()),
    preview: (get) => display(Object.assign(defaults(), accept(get())))
  }
}

export type DeepRequired<T> = {
  [K in keyof Required<T>]: Required<Required<T>[K]>
}
