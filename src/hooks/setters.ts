import { StoreQueries } from "./queries";
import { dateToMonthInput, monthInputToDate } from "../utils/dateConverters";

export type PeriodSetter = ModelSetter<Period, 'era' | 'order' | 'title'>

export const setters = <T>(set: setZustand<ModelStore>, get: () => ModelStore & StoreQueries) => ({
  setModel<K extends keyof ModelStore, X extends '' | keyof StoredModel<K> = ''>(modelType: K) {
    return (id: string) => (partial: Partial<SetModel<StoredModel<K>, X>>) => {
      const intId = parseInt(id)
      set(store => ({
        [modelType]: {
          ...store[modelType],
          count: store[modelType].count < intId ? intId : store[modelType].count,
          models: {
            ...store[modelType].models,
            [id]: {
              id,
              ...store[modelType].models[id],
              ...partial
            }
          }
        }
      }))
    }
  },
  profileSetter(id: string): ModelSetter<Profile> {
    const { firstName, lastName, profession, description, img } = get().getModel('profiles', id)
    return [
      { firstName, lastName, profession, description, img },
      this.setModel('profiles')(id)
    ]
  },
  periodSetter(id: string): ModelSetter<Period, 'order' | 'era'> {
    const hook = this.setModel<'periods', 'order' | 'era'>('periods')(id)
    const { startDate, endDate, toPresent, title, subtitle, introduction } = get().getModel('periods', id)
    return [
      {
        startDate: dateToMonthInput(startDate),
        endDate: dateToMonthInput(endDate ?? new Date()),
        toPresent: toPresent ?? false,
        title,
        subtitle: subtitle ?? '',
        introduction: introduction ?? ''
      },
      partial => hook({
        ...partial,
        startDate: monthInputToDate(partial.startDate),
        endDate: monthInputToDate(partial.endDate)
      })
    ]
  },
  addModel<K extends keyof ModelStore, X extends '' | keyof StoredModel<K> = ''>(modelType: K, increment?: number) {
    const count = get()[modelType].count + (increment ?? 1)
    const hook = this.setModel<K, X>(modelType)(count.toString())
    return hook
  },
  addEraEvent<K extends 'periods' | 'ratedSkills' | 'iconicItems', X extends '' | keyof StoredModel<K> = ''>(eventType: K, eraId: string) {
    return (partial: Partial<SetModel<StoredModel<K>, X>>) => this.addModel<K, X>(eventType)({
      ...partial,
      era: eraId
    })
  },
  iconicItemAdder(eraId: string): ModelSetter<IconicItem, 'order' | 'era'> {
    const hook = this.addEraEvent<'iconicItems', 'order' | 'era'>('iconicItems', eraId)
    return [
      {
        icon: '',
        item: ''
      },
      hook
    ]
  },
  ratedSkillAdder(eraId: string): ModelSetter<RatedSkill, 'order' | 'era'> {
    const hook = this.addEraEvent<'ratedSkills', 'order' | 'era'>('ratedSkills', eraId)
    return [
      {
        skill: '',
        rating: 0
      },
      hook
    ]
  },
  addPeriod(eraId: string): ModelSetter<Period, 'order' | 'era'> {
    const hook = this.addModel('periods')
    const [startDate, endDate] = [dateToMonthInput(new Date()), dateToMonthInput(new Date())]
    return [
      {
        startDate,
        endDate,
        toPresent: false,
        title: '',
        subtitle: '',
        introduction: ''
      },
      partial => hook({
        ...partial,
        startDate: monthInputToDate(partial.startDate),
        endDate: monthInputToDate(partial.endDate),
        era: eraId
      })
    ]
  },
  eraTitleSetter(id: string): EditValueProps<string> {
    const { title } = get().getModel('eras', id)
    const hook = this.setModel('eras')(id)
    return {
      value: title,
      set: value => hook({
        title: value
      })
    }
  },
  featureSetter(id: string): EditValueProps<string> {
    const { feature } = get().getModel('periodFeatures', id)
    const hook = this.setModel('periodFeatures')(id)
    return {
      value: feature,
      set: value => hook({
        feature: value.replace('\n', '<br />')
      })
    }
  },
  addFeature(periodId: string): ModelSetter<PeriodFeature, 'order' | 'period'> {
    const hook = this.addModel('periodFeatures')
    return [
      {
        feature: ''
      },
      partial => hook({
        ...partial,
        feature: partial.feature?.replace('\n', '<br />'),
        period: periodId
      })
    ]
  }
})

export type StoreSetters = ReturnType<typeof setters>
