import { memo, useState } from 'react'
import { EditPermissionContext, EditableContext, useEditPermissionContext, useEditableContext } from '../../contexts/EditContext'

export const SaveButton = memo(
  () => {
    const { isTouched, save } = useEditableContext()
    return <button className="save" disabled={isTouched} onClick={save} />
  }
)

export const ToggleEditButton = memo(
  () => {
    const { editToggled, toggleEdit } = useEditableContext()

    return (
      <button className="toggle edit" onClick={() => toggleEdit(!editToggled)}>
        {editToggled ? 'cancel' : 'edit'}
      </button>
    )
  }
)

export const EditControl = memo(
  ({ create, hide }: { create?: boolean, hide?: () => void }) => {
    const { editToggled, toggleEdit, isTouched, save, revert } = useEditableContext()
    const cancelText = create ? 'preview' : 'cancel'
    const revertText = create ? 'clear' : 'revert'
    return (
      <div>
        <button onClick={() => toggleEdit(!editToggled)}>
          {editToggled ? cancelText : 'edit'}
        </button>
        {
          editToggled && <>
            <button disabled={!create && !isTouched} onClick={save}>
              save
            </button>
            <button disabled={!isTouched} onClick={revert}>
              {revertText}
            </button>
          </>
        }
        {
          create && hide && <button onClick={hide}>cancel</button>
        }
      </div>
    )
  }
)
