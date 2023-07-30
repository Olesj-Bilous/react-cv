import { create } from 'zustand'

import { initStore } from '../models/initStore'
import { computed } from '../models/computed'
import { queries } from '../models/queries'

export const useZustand = create<ModelStore & ReturnType<typeof computed> & ReturnType<typeof queries>>((set, get) => ({
  ...initStore,
  ...computed(get),
  ...queries(get)
}))
