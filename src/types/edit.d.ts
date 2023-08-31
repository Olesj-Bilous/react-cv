

interface EditableContext {
  editToggled: boolean
  toggleEdit: (value: boolean) => void
  isTouched: boolean
  revert: () => void
  save: () => void
}

type BareModel<T extends object = Model> = Omit<ModelType<T & Model>, 'id'>

type SetModel<T extends Model, X extends '' | keyof T = ''> = Omit<BareModel<T>, X>

type DateToStringConversion<S> = S extends Date ? string : S

type InputModel<T extends Model, X extends '' | keyof T = ''> = {
  [Key in keyof SetModel<T, X>]: DateToStringConversion<SetModel<T, X>[Key]>
}

type DefinedValue<V> = V extends undefined ? never : V

type DefinedModel<T> = {
  [Key in keyof T]-?: DefinedValue<T[Key]>
}

type ModelSetter<T extends Model, X extends '' | keyof T = ''> = [
  model: DefinedModel<InputModel<T, X>>,
  hook: (partial: Partial<InputModel<T, X>>) => void
]

type EditValueProps<T> = {
  value: T
  set: (value: T) => void
}

type EditValuePropsMap<T extends Model, X extends '' | keyof T = ''> = {
  [Key in keyof DefinedModel<InputModel<T, X>>]: EditValueProps<DefinedModel<InputModel<T, X>>[Key]>
}

type EditToggleProp<D, E = D, X extends '' | keyof E = ''> = {
  display: D
  edit: [E] extends [Model] ? EditValuePropsMap<E, X> : EditValueProps<DefinedValue<E>>
}

interface EditControl {
  editToggled: boolean
  toggleEdit: (value: boolean) => void
  revert: () => void
  save: () => void
  isTouched: boolean
}

type HookedModel<T> = [
  model: T,
  hook: (partial: Partial<T>) => void
]

type HookedValue<T> = [
  value: T,
  hook: (value: T) => void
]

type HookedMap<T> = {
  [Key in keyof T]: T[Key] extends object ? never : HookedValue<T[Key]>
}

type DeepHookedMap<T> = {
  [Key in keyof T]: T[Key] extends object ? HookedMap<T[Key]> : HookedValue<T[Key]>
}

interface HookedEditToggle<E, D = E> {
  edit: {
    hook: E extends object ? HookedMap<E> : HookedValue<E>
  }
  display: D
}

type HookedEditMap<
  E extends object,
  D extends Record<keyof E, any> = E
> = {
  [Key in keyof E]: HookedEditToggle<E[Key], D[Key]>
}
