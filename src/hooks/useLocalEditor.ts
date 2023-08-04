import { useState, useCallback, useMemo } from "react"
import { shallowCompare } from "../utils/objectChecks"
import { useEditPermissionContext } from "../contexts/EditContext"

export function useLocalEditor<T extends Model, X extends string = ''>(
  { modelSetter: [globalModel, setGlobalModel] }: { modelSetter: ModelSetter<T, X> }
) {
  const [editToggled, toggleEdit] = useState(false)

  const [model, setModel] = useState(globalModel)

  const revert = useCallback(
    () => setModel(globalModel),
    [setModel, globalModel]
  )

  const save = useCallback(
    () => setGlobalModel(model),
    [setGlobalModel, model]
  )

  const isTouched = useMemo(
    () => !shallowCompare(model, globalModel),
    [model, globalModel]
  )

  const setFactory = useCallback(
    (propKey: keyof InputModel<T, X>) => useCallback(
      (value: InputModel<T, X>[typeof propKey]) => setModel(state => ({
        ...state,
        [propKey]: value
      })
      ),
      [propKey]
    ),
    [setModel]
  )

  const content: Partial<EditValuePropsMap<T, X>> = {}
  const contentKeys: (keyof typeof model)[] = []
  for (const ukey in model) {
    const key = ukey as keyof typeof model
    contentKeys.push(key)
    content[key] = {
      value: model[key],
      set: setFactory(key)
    }
  }

  return {
    content: content as EditValuePropsMap<T, X>,
    keys: contentKeys,
    control: {
      editToggled,
      toggleEdit,
      revert,
      save,
      isTouched
    }
  }
}
