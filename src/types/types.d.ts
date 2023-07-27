

interface Model {
  id: string
}

type ModelType<TModel extends Model> = {
  [Key in keyof TModel]:
    TModel[Key] extends boolean | number | string | Date | undefined
      ? TModel[Key]
      : TModel[Key] extends Model
        ? TModel[Key]['id']
        : never
}

type KeyMap<T> = { [key: string]: T }

interface ModelMap<TModel extends Model> {
  models: {
    [key: string]: ModelType<TModel>
  }
}

interface PeriodProps {
  startDate: Date
  endDate?: Date
  toPresent?: boolean
}

interface HeaderProps {
  title: string
  subtitle?: string
  introduction?: string
}

interface Period extends EraEvent, PeriodProps, HeaderProps {}

interface RatedSkill extends EraEvent {
  rating: number
  skill: string
}

interface IconicItem extends EraEvent {
  icon: string
  item: string
}

interface ModelStore {
  ratedSkills: ModelMap<RatedSkill>
  iconicItems: ModelMap<IconicItem>
  periods: ModelMap<Period>
  eras: ModelMap<Era>
  profiles: ModelMap<Profile>
}

interface Profile extends Model {
  firstName: string
  lastName: string
  profession: string
  description: string
  img: string
}

interface Era extends Model {
  title: string
  profile: Profile
}

interface EraEvent extends Model {
  era: Era
}

interface TitledArray<TItem extends Model> {
  title: string
  items: TItem[]
  order: string[]
}

interface TitledArrayMap<TItem extends Model> {
  map: {
    [key: string]: TitledArray<TItem>
  }
  order: string[]
}
