import { StoreQueries } from "./queries";
import { dateToInput, inputToDate } from "../utils/converters";

export type PeriodSetter = ModelSetter<Period, 'era' | 'order' | 'title'>

export const setters = <T extends ModelStore & StoreQueries>(set: setZustand<ModelStore>, get: () => T) => ({
  setHook<K extends keyof ModelStore, X extends string = ''>(modelType: K) {
    return (id: string) => (partial: Partial<SetModel<StoredModel<K>, X>>) => set(store => ({
      [modelType]: {
        models: {
          [id]: {
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
      partial => this.setHook('periods')(id)({
        ...partial,
        startDate: inputToDate(partial.startDate),
        endDate: inputToDate(partial.endDate)
      })
    ]
  },
  eraTitleSetter(id: string): EditValueProps<string> {
    const { title } = get().getModel('eras', id)
    return {
      value: title,
      set: value => this.setHook('eras')(id)({
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
