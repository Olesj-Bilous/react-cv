import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

import { initStore } from '../models/initStore'
import { StoreComputed, computed } from './computed'
import { StoreQueries, queries } from './queries'
import { StoreSetters, setters } from './setters'

export const useZustand = create<ModelStore & StoreComputed & StoreQueries & StoreSetters>()(
  persist(
    (set, get) => ({
      ...initStore,
      ...computed(get),
      ...queries(get),
      ...setters(set, get)
    }), {
      name: 'cv-store',
      storage: createJSONStorage(
        () => localStorage, {
          reviver: (key, value) => typeof value !== 'string' || !isISODateString(value) ? value : new Date(value)
        }
      ),
      onRehydrateStorage: (state) => {
        console.log(state)
        return (state, error) => {
          if (error)
            console.log(error)
          console.log(state)
        }
      }
    }
  )
)

export function isISODateString(value: string) {
  return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(value)
}
