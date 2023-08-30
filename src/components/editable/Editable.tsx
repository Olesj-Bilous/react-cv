import { memo, useState } from 'react'
import { EditPermissionContext, EditableContext, useEditPermissionContext, useEditableContext } from '../../contexts/Editable.Context'
import { EditControl } from './EditControl'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'

export const Editable = memo(
  ({ children, create, editToggled, ...ctrlProps }: EditableContext & {
    children?: React.ReactNode
    create?: boolean
  }) => {
    const { allowEdit } = useEditPermissionContext()
    const [show, setShow] = useState(!create)

    return <div className="editable">{
      <EditableContext.Provider value={{
        editToggled: allowEdit && editToggled,
        ...ctrlProps
      }}>
        {
          show
            ? <>
              <div className="content">
                {children}
              </div>
              {allowEdit && <EditControl create={create} hide={() => setShow(false)} />}
            </>
            : allowEdit && <button onClick={() => setShow(true)}>
              <FontAwesomeIcon icon={icon({name: 'plus'})} />  
            </button>
        }
      </EditableContext.Provider>
    }</div>
  }
)
