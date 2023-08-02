

interface Model {
  id: string
}

type KeyMap<T> = { [key: string]: T }

type ModelType<TModel extends Model> = {
  [Key in keyof TModel]:
  TModel[Key] extends boolean | number | string | Date | undefined
  ? TModel[Key]
  : TModel[Key] extends Model
  ? TModel[Key]['id']
  : never
}

interface ModelMap<TModel extends Model> {
  models: KeyMap<ModelType<TModel>>
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

type SetModel<T extends Model, X extends string = ''> = Omit<T, 'id' | X>

type ModelSetter<T extends Model, X extends string = ''> = [
  model: SetModel<T, X>,
  hook: (partial: Partial<SetModel<T, X>>) => void
]

type EditValueProps<T> = {
  value: T
  set: (value: T) => void
}

type EditValuePropsMap<T extends Model, X extends string = ''> = {
  [Key in keyof SetModel<T, X>]: EditValueProps<T[Key]>
}
