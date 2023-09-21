import { StoreQueries } from "./queries";
import { dateToMonthInput, monthInputToDate } from "../utils/dateConverters";
import { iconicItemScheme, periodScheme, ratedSkillScheme } from "../models/periodScheme";
import { Scheme } from "../models/initScheme";

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
  deleteModel<K extends keyof ModelStore>(modelType: K, id: string) {
    return () => set(store => {
      delete store[modelType].models[id]
      return { ...store }
    })
  },
  addModel<K extends keyof ModelStore, X extends '' | keyof StoredModel<K> = ''>(modelType: K) {
    const count = get()[modelType].count + 1
    const hook = this.setModel<K, X>(modelType)(count.toString())
    return hook
  },
  profileSetter(id: string): ModelSetter<Profile> {
    const { firstName, lastName, profession, description, img } = get().getModel('profiles', id)
    return [
      { firstName, lastName, profession, description, img },
      this.setModel('profiles')(id)
    ]
  },
  addEraEvent<K extends 'periods' | 'ratedSkills' | 'iconicItems', X extends '' | keyof StoredModel<K> = ''>(eventType: K, eraId: string) {
    return (partial: Partial<SetModel<StoredModel<K>, X>>) => this.addModel<K, X>(eventType)({
      ...partial,
      era: eraId
    })
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
  periodControl(
    settings: {
      locales: Intl.LocalesArgument;
      present: string;
    },
    formatOptions: Intl.DateTimeFormatOptions
  ) {
    const scheme = periodScheme(settings, formatOptions)
    return this.eraEventControl('periods', scheme)
  },
  iconicItemControl() {
    return this.eraEventControl('iconicItems', iconicItemScheme)
  },
  ratedSkillControl() {
    return this.eraEventControl('ratedSkills', ratedSkillScheme)
  },
  eraEventControl<K extends 'periods' | 'ratedSkills' | 'iconicItems', E extends object = SetModel<StoredModel<K>>, D extends object = E>(
    key: K,
    scheme: Scheme<SetModel<StoredModel<K>>, E, D>
  ) {
    return {
      add: ({ eraId }: { eraId: string }) => {
        return {
          add: scheme.add(this.addEraEvent(key, eraId)),
          preview: scheme.preview
        }
      },
      set: ({ id }: Model) => {
        const getter = () => get().getModel(key, id)
        return {
          set: scheme.set(this.setModel(key)(id), getter),
          preview: scheme.preview,
          display: scheme.display(getter)
        }
      }
    }
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
        feature: value
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
        period: periodId
      })
    ]
  }
})

export type StoreSetters = ReturnType<typeof setters>
