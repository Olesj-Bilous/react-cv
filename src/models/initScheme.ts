

export interface SchemeArgs<
  T extends object,
  E extends object = T,
  D extends object = E
> {
  defaults: () => Required<T>
  edit: (t: Required<T>) => E
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
    set: (set, get) => [
      edit(Object.assign({}, get(), defaults())),
      setHook(set)
    ],
    display: (get) => display(get()),
    preview: (get) => display(Object.assign(accept(get()), defaults()))
  }
}

export type DeepRequired<T> = {
  [K in keyof Required<T>]: Required<Required<T>[K]>
}

export function toToggle<
  E extends object,
  D extends {
    [K in keyof E]: E[K] extends undefined ? undefined : any
  } = E
>({ edit, display }: {
  edit: DeepHookedMap<DeepRequired<E>>
  display: D
}): HookedEditMap<DeepRequired<E>, D> {
  const map: Partial<HookedEditMap<DeepRequired<E>, D>> = {}
  for (const key in edit) {
    map[key] = {
      edit: { hook: edit[key]},
      display: display[key]
    }
  }
  return map as HookedEditMap<DeepRequired<E>, D>
}

