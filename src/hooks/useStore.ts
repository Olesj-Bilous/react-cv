import { create } from 'zustand'

import { initStore } from '../models/initStore'
import { computed } from '../models/computed'

export const useZustand = create<ModelStore & ReturnType<typeof computed>>((set, get) => ({
  ...initStore,
  ...computed(get)
}))
