

interface Model {
  id: string
}

type KeyMap<T> = { [key: string]: T }

type ModelType<TModel extends Model> = {
  [Key in keyof TModel]:
    TModel[Key] extends boolean | number | string | undefined | Date
      ? TModel[Key]
      : TModel[Key] extends Model
        ? TModel[Key]['id']
        : never
}

interface ModelMap<TModel extends Model> {
  models: KeyMap<ModelType<TModel>>
  count: number
}

interface ModelStore {
  profiles: ModelMap<Profile>
  eras: ModelMap<Era>
  periods: ModelMap<Period>
  periodFeatures: ModelMap<PeriodFeature>
  ratedSkills: ModelMap<RatedSkill>
  iconicItems: ModelMap<IconicItem>
}

type StoredModel<K extends keyof ModelStore> = ModelStore[K] extends ModelMap<infer M> ? M : never

type setZustand<T> = (partial: Partial<T> | ((state: T) => Partial<T>), replace?: boolean) => void

type SetModel<T extends Model, X extends '' | keyof T = ''> = Omit<ModelType<T>, 'id' | X>

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

type EditToggleMap<T extends Model, X extends '' | keyof T = ''> = {
  [Key in keyof InputModel<T, X>]: EditToggleProp<InputModel<T, X>[Key]>
}
 
interface EditControl {
  editToggled: boolean
  toggleEdit: (value: boolean) => void
  revert: () => void
  save: () => void
  isTouched: boolean
}
