

type FullName = {
  firstName: string,
  lastName: string
}

interface Profile extends Model, FullName {
  profession: string
  description: string
  img: string
}

interface OrderedModel extends Model {
  order: number
}

interface Era extends OrderedModel {
  title: string
  profile: Profile
}

interface EraEvent extends OrderedModel {
  era: Era
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

interface FeaturedPeriod extends Period {
  features: PeriodFeature[]
}

interface PeriodFeature extends OrderedModel {
  feature: string
  period: Period
}

interface RatedSkill extends EraEvent {
  rating: number
  skill: string
}

interface IconicItem extends EraEvent {
  icon: string
  item: string
}

interface Section<TItem extends Model> extends OrderedModel {
  title: string
  items: TItem[]
}

type SectionArray<TItem extends Model> = Section<TItem>[]
