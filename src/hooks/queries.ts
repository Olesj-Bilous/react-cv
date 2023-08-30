import { displayPeriod } from "../utils/dateConverters"


export const queries = <T extends ModelStore>(get: () => T) => ({
  getModel<K extends keyof ModelStore>(type: K, id: string) {
    return get()[type].models[id] as ModelType<StoredModel<K>>
  },
  getHeaderProps(type: 'periods' | 'profiles' | 'eras', id: string): HeaderProps {
    switch (type) {
      case 'eras': {
        const { title } = this.getModel(type, id)
        return { title }
      }
      case 'periods': {
        const { title, subtitle, introduction } = this.getModel(type, id)
        return {
          title,
          subtitle,
          introduction
        }
      }
      case 'profiles': {
        const { firstName, lastName, profession: subtitle, description: introduction } = this.getModel(type, id)
        const title = `${firstName} ${lastName}`
        return {
          title,
          subtitle,
          introduction
        }
      }
    }
  },
  getPeriodDateString(settings:{locales: Intl.LocalesArgument,present:string}, formatOptions: Intl.DateTimeFormatOptions, id: string) {
    return displayPeriod(settings, formatOptions, this.getModel('periods', id))
  },
  getFeature(id: string) {
    const {feature} = this.getModel('periodFeatures', id)
    return feature
  }
})

export type StoreQueries = ReturnType<typeof queries>
