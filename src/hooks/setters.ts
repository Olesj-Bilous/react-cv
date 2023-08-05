import { StoreQueries } from "./queries";
import { dateToInput, inputToDate } from "../utils/converters";

export type PeriodSetter = ModelSetter<Period, 'era' | 'order' | 'title'>

export const setters = <T extends ModelStore & StoreQueries>(set: setZustand<ModelStore>, get: () => T) => ({
  setHook<K extends keyof ModelStore, X extends '' | keyof StoredModel<K> = ''>(modelType: K) {
    return (id: string) => (partial: Partial<SetModel<StoredModel<K>, X>>) => set(store => ({
      [modelType]: {
        ...store[modelType],
        models: {
          ...store[modelType].models,
          [id]: {
            //@ts-ignore
            id,
            ...store[modelType].models[id],
            ...partial
          }
        }
      }
    }))
  },
  profileSetter(id: string): ModelSetter<Profile> {
    const { firstName, lastName, profession, description, img } = get().getModel('profiles', id)
    return [
      { firstName, lastName, profession, description, img },
      this.setHook('profiles')(id)
    ]
  },
  periodSetter(id: string): ModelSetter<Period, 'order' | 'era'> {
    const hook = this.setHook<'periods', 'order' | 'era'>('periods')(id)
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
  periodAdder(eraId: string): ModelSetter<Period, 'order' | 'era'> {
    const count = get().periods.count++
    const hook = this.setHook('periods')(count.toString())
    return [
      {
        startDate: dateToInput(new Date()),
        endDate: dateToInput(new Date()),
        toPresent: false,
        title: '',
        subtitle: '',
        introduction: ''
      },
      partial => hook({
        ...partial,
        startDate: inputToDate(partial.startDate),
        endDate: inputToDate(partial.endDate),
        era: eraId,
        order: count
      })
    ]
  },
  eraTitleSetter(id: string): EditValueProps<string> {
    const { title } = get().getModel('eras', id)
    const hook = this.setHook('eras')(id)
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
