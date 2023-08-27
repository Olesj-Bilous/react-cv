import { StoreQueries } from "./queries";
import { dateToInput, inputToDate } from "../utils/converters";

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
        startDate: dateToInput(startDate),
        endDate: dateToInput(endDate ?? new Date()),
        toPresent: toPresent ?? false,
        title,
        subtitle: subtitle ?? '',
        introduction: introduction ?? ''
      },
      partial => hook({
        ...partial,
        startDate: inputToDate(partial.startDate),
        endDate: inputToDate(partial.endDate)
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
    const [startDate, endDate] = [dateToInput(new Date()), dateToInput(new Date())]
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
        startDate: inputToDate(partial.startDate),
        endDate: inputToDate(partial.endDate),
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
  }
})

export type StoreSetters = ReturnType<typeof setters>

export const headerSetters = <T extends ModelStore & StoreQueries & StoreSetters>(set: setZustand<ModelStore>, get: () => T) => ({
  headerSetters: {
    profiles: (id: string) => {
      const setter = get().profileSetter(id)
      return 
    },
    periods: (id: string) => get().periodSetter(id)
  }
})

export type StoreHeaderSetters = ReturnType<typeof headerSetters>
