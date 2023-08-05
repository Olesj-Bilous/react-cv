import { memo, useState } from 'react'
import { EditPermissionContext, EditableContext, useEditPermissionContext, useEditableContext } from '../../contexts/EditContext'
import { EditControl } from './EditControl'

export const Editable = memo(
  ({ children, create, editToggled, ...ctrlProps }: EditableContext & {
    children?: React.ReactNode
    create?: boolean
  }) => {
    const { allowEdit } = useEditPermissionContext()
    const [show, setShow] = useState(!create)

    return <>{
      <EditableContext.Provider value={{
        editToggled: allowEdit && editToggled,
        ...ctrlProps
      }}>
        {
          show
            ? <>
              {children}
              {allowEdit && <EditControl create={create} hide={() => setShow(false)} />}
            </>
            : allowEdit && <button onClick={() => setShow(true)}>add</button>
        }
      </EditableContext.Provider>
    }</>
  }
)
