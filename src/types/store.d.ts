

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

type SetModel<T extends Model, X extends string = ''> = Omit<ModelType<T>, 'id' | X>

type ChainableConditionalConservativeConversion<S, T, U> = S extends T ? U : S extends undefined ? undefined : S

type DateToStringConversion<S> = ChainableConditionalConservativeConversion<S, Date, string>

type InputModel<T extends Model, X extends string = ''> = {
  [Key in keyof SetModel<T, X>]: DateToStringConversion<SetModel<T, X>[Key]>
}

type DefinedValue<V> = V extends undefined ? never : V

type DefinedModel<T> = {
  [Key in keyof T]-?: DefinedValue<T[Key]>
}

type ModelSetter<T extends Model, X extends string = ''> = [
  model: DefinedModel<InputModel<T, X>>,
  hook: (partial: Partial<InputModel<T, X>>) => void
]

type EditValueProps<T> = {
  value: T
  set: (value: T) => void
}

type EditValuePropsMap<T extends Model, X extends string = ''> = {
  [Key in keyof DefinedModel<InputModel<T, X>>]: EditValueProps<DefinedModel<InputModel<T, X>>[Key]>
}
