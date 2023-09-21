import { memo, useState } from 'react'
import { EditPermissionContext, EditableContext, useEditPermissionContext, useEditableContext } from '../../contexts/Editable.Context'
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
const deleteIconDef = icon({name: 'trash'})

export const EditControl = memo(
  ({ create, hide, deleteM }: { create?: boolean, hide?: () => void, deleteM?: () => void }) => {
    const { editToggled, toggleEdit, isTouched, save, revert } = useEditableContext()
    
    const Cancel = <FontAwesomeIcon icon={cancel} />

    const saveAction = create ? () => { save(); revert(); hide && hide() } : save
    
    return (
      <div className="control">
        {create && <button onClick={() => toggleEdit(!editToggled)}>
          {editToggled ? <FontAwesomeIcon icon={preview} /> : <FontAwesomeIcon icon={edit} />}
        </button>}
        {
          editToggled && <>
            {
              !create && <button onClick={() => toggleEdit(false)}>
                {Cancel}
              </button>
            }
            <button disabled={!create && !isTouched} onClick={saveAction}>
              <FontAwesomeIcon icon={saveIconDef} />
            </button>
            <button disabled={!isTouched} onClick={revert}>
              <FontAwesomeIcon icon={undo} />
            </button>
            {!create && deleteM! && <button onClick={deleteM}>
              <FontAwesomeIcon icon={deleteIconDef} />
            </button>}
          </>
        }
        {
          create && hide && <button onClick={hide}>{ Cancel }</button>
        }
      </div>
    )
  }
)
