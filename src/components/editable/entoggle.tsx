import { FC } from 'react'
import { useEditableContext } from '../../contexts/Editable.Context'

export function entoggleValueEdit<T>({ Edit, Display }: {
  Edit: FC<{ state: HookedValue<T> }>
  Display: FC<{ display: T }>
}): FC<{ state: HookedValue<T> }> {
  return function Togglable({ state }) {
    const { editToggled } = useEditableContext()
    return editToggled ? <Edit state={state} /> : <Display display={state[0]} />
  }
}

export function entoggleMapEdit<T extends object>({ Edit, Display }: {
  Edit: FC<HookedMap<T>>
  Display: FC<T>
}): FC<HookedMap<T>> {
  return function Togglable(map) {
    const { editToggled } = useEditableContext()
    const display: Partial<T> = {}
    for (const key in map) {
      display[key] = map[key][0]
    }
    return editToggled ? <Edit {...map} /> : <Display {...display as T} />
  }
}

type LiquidMap<T extends object> = { [K in keyof T]: {
  state: HookedValue<T[K]>
} }

export function liquifyMap<T extends object>(map: HookedMap<T>) {
  const liquid: Partial<LiquidMap<T>> = {}
  for (const key in map) {
    liquid[key] = {
      state: map[key]
    }
  }
  return liquid as LiquidMap<T>;
}
