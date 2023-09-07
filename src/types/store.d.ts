

interface Model {
  id: string
}

type SimpleValue = undefined | boolean | number | string | Date

type ModelType<T extends Model> = {
  [Key in keyof T]:
    T[Key] extends SimpleValue
      ? T[Key]
      : T[Key] extends Model
        ? T[Key]['id']
        : never
}

type KeyMap<T> = { [key: string]: T }

interface ModelMap<T extends Model> {
  models: KeyMap<ModelType<T>>
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
