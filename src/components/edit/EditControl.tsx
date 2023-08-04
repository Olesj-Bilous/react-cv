import { memo } from 'react'
import { EditPermissionContext, EditToggleContext, useEditPermissionContext, useEditToggleContext } from '../../contexts/EditContext'

export type SaveButtonProps = {
  isTouched: boolean
  save: () => void
}

export type EditControlProps = EditButtonProps & SaveButtonProps

export type EditButtonProps = {
  editToggled: boolean
  toggleEdit: (editToggled: boolean) => void
}

export const ConditionalButton = memo(
  ({ condition, action, children }: {condition: boolean, action: () => void, children?: React.ReactNode}) => (
    <button disabled={condition} onClick={action}>
      {children}
    </button>
  )
)

export const SaveButton = memo(
  () => {
    const { isTouched, save } = useEditToggleContext()
    return <button className="save" disabled={isTouched} onClick={save} />
  }
)

export const ToggleEditButton = memo(
  () => {
    const { editToggled, toggleEdit } = useEditToggleContext()

    return (
      <button className="toggle edit" onClick={() => toggleEdit(!editToggled)}>
        {editToggled ? 'cancel' : 'edit'}
      </button>
    )
  }
)

export const EditControl = memo(
  () => {
    const { editToggled, toggleEdit, isTouched, save, revert } = useEditToggleContext()
    return (
      <div>
        <button onClick={() => toggleEdit(!editToggled)}>
          {editToggled ? 'cancel' : 'edit'}
        </button>
        {
          editToggled && <>
            <button disabled={isTouched} onClick={save}>
              save
            </button>
            <button disabled={isTouched} onClick={revert}>
              revert
            </button>
          </>
        }
      </div>
    )
  }
)

export const Editable = memo(
  ({ children, editToggled, ...ctrlProps }: EditControlProps & { revert: () => void } & {
    children?: React.ReactNode
  }) => {
    const { allowEdit } = useEditPermissionContext()

    return (
      <EditToggleContext.Provider value={{
        editToggled: allowEdit && editToggled,
        ...ctrlProps
      }}>
        {children}
        {allowEdit && <EditControl />}
      </EditToggleContext.Provider>
    )
  }
)
