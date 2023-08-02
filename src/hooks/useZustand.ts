import { create } from 'zustand'

import { initStore } from '../models/initStore'
import { StoreComputed, computed } from './computed'
import { StoreQueries, queries } from './queries'
import { StoreHeaderSetters, StoreSetters, headerSetters, setters } from './setters'

export const useZustand = create<ModelStore & StoreComputed & StoreQueries & StoreSetters & StoreHeaderSetters>((set, get) => ({
  ...initStore,
  ...computed(get),
  ...queries(get),
  ...setters(set, get),
  ...headerSetters(set, get)
}))
