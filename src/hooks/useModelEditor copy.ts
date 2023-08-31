import { useState, useCallback, useMemo } from "react"
import { shallowCompare } from "../utils/checks/objectChecks"
import { useEditPermissionContext } from "../contexts/Editable.Context"

export function useHookedEditor<T extends object>(
  { modelSetter: [globalModel, setGlobalModel], toggled }: {
    modelSetter: HookedModel<T>
    toggled?: boolean
  }
): {
  map: HookedMap<T>
  control: EditControl,
  local: T
} {
  const [editToggled, toggleEdit] = useState(toggled ?? false)

  const [model, setModel] = useState(globalModel)

  const revert = useCallback(
    () => setModel(globalModel),
    [globalModel]
  )

  const save = useCallback(
    () => { setGlobalModel(model); toggleEdit(toggled ?? false) },
    [model, toggled]
  )

  const isTouched = useMemo(
    () => !shallowCompare(model, globalModel),
    [model, globalModel]
  )

  const setFactory = useCallback(
    (propKey: keyof T) => useCallback(
      (value: T[typeof propKey]) => setModel(
        state => ({
          ...state,
          [propKey]: value
        })
      ),
      [propKey]
    ),
    [setModel]
  )

  const map: Partial<HookedMap<T>> = {}
  for (const key in model) {
    const node = model[key]
    if (typeof node === 'object') continue
    //@ts-ignore
    map[key] = [
      node,
      setFactory(key)
    ] as HookedValue<typeof node>
  }

  return {
    map: map as HookedMap<T>,
    control: {
      editToggled,
      toggleEdit,
      revert,
      save,
      isTouched
    },
    local: model
  }
}
