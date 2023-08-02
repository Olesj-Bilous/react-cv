import { useState, useCallback } from "react"
import { shallowCompare } from "../utils/objectChecks"
import { useEditPermissionContext } from "../contexts/EditContext"

export function useLocalEditor<T extends Model, X extends string = ''>({ modelSetter: [globalModel, setGlobalModel] }
  : { modelSetter: ModelSetter<T, X> }
) {
  const { allowEdit } = useEditPermissionContext()
  const [editToggled, toggleEdit] = useState(false)

  const [model, setModel] = useState(globalModel)

  const cancel = useCallback(
    () => {
      toggleEdit(false)
      
    },
    [toggleEdit]
  )

  const setFactory = useCallback(
    (propKey: keyof SetModel<T, X>) => useCallback(
      (value: SetModel<T, X>[typeof propKey]) => setModel(state => ({
        ...state,
        [propKey]: value
      })
      ),
      [propKey]
    ),
    [setModel]
  )

  const content: Partial<EditValuePropsMap<T, X>> = {}
  const contentKeys: (keyof SetModel<T, X>)[] = []
  for (const ukey in model) {
    const key = ukey as keyof SetModel<T, X>
    contentKeys.push(key)
    content[key] = {
      value: model[key],
      set: setFactory(key)
    }
  }

  const save = useCallback(
    () => {
      setGlobalModel(model)
      cancel && cancel()
    },
    [setGlobalModel, cancel, model]
  )

  const isTouched = !shallowCompare(model, globalModel)

  return {
    ...content as EditValuePropsMap<T, X>,
    allowEdit,
    editToggled,
    toggleEdit,
    cancel,
    save,
    isTouched,
    contentKeys
  }
}
