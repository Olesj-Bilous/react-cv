import { useState, useCallback, useMemo } from 'react'


export function useValueEditor<T extends boolean | number | string>(
  { globalValue: [storeValue, setStore], toggled }: {
    globalValue: HookedValue<T>
  } & {
    toggled?: boolean
  }
): {
  content: HookedValue<T>
  control: EditControl
} {
  const [editToggled, toggleEdit] = useState(false)

  const [value, setValue] = useState(storeValue)

  const revert = useCallback(
    () => setValue(storeValue),
    [storeValue]
  )

  const save = useCallback(
    () => { setStore(value); toggleEdit(toggled ?? false)},
    [value, toggled]
  )

  const isTouched = useMemo(
    () => value !== storeValue,
    [value, storeValue]
  )

  return {
    content: [value, setValue],
    control: {
      editToggled,
      toggleEdit,
      revert,
      save,
      isTouched
    }
  }
}
