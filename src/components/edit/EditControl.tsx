import { memo, useState } from 'react'
import { EditPermissionContext, EditableContext, useEditPermissionContext, useEditableContext } from '../../contexts/EditContext'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

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

const preview = icon({ name: 'eye' })
const cancel = icon({ name: 'xmark' })
const edit = icon({ name: 'pencil' })
const undo = icon({ name: 'undo' })
const saveIconDef = icon({ name: 'check' })

export const EditControl = memo(
  ({ create, hide }: { create?: boolean, hide?: () => void }) => {
    const { editToggled, toggleEdit, isTouched, save, revert } = useEditableContext()
    
    const cancelIcon = <FontAwesomeIcon icon={cancel} />

    const cancellationIcon = create
      ? <FontAwesomeIcon icon={preview} />
      : cancelIcon
    
    const revertIcon = <FontAwesomeIcon icon={undo} />

    const saveAction = create ? () => { save(); revert(); hide && hide() } : save
    
    return (
      <div className="control">
        <button onClick={() => toggleEdit(!editToggled)}>
          {editToggled ? cancellationIcon : <FontAwesomeIcon icon={ edit } />}
        </button>
        {
          editToggled && <>
            <button disabled={!create && !isTouched} onClick={saveAction}>
              <FontAwesomeIcon icon={saveIconDef} />
            </button>
            <button disabled={!isTouched} onClick={revert}>
              {revertIcon}
            </button>
          </>
        }
        {
          create && hide && <button onClick={hide}>{ cancelIcon }</button>
        }
      </div>
    )
  }
)
