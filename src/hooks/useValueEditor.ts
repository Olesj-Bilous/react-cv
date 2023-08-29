import { useState, useCallback, useMemo } from 'react'


export function useValueEditor<T extends boolean | number | string>(
  { value: storeValue, set: setStore, toggled }: EditValueProps<T> & {
    toggled?: boolean
  }
): {
  content: EditValueProps<T>
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
    content: { value, set: setValue },
    control: {
      editToggled,
      toggleEdit,
      revert,
      save,
      isTouched
    }
  }
}
