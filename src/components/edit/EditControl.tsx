import { memo } from 'react'

export type SaveButtonProps = {
  isTouched: boolean
  save: () => void
}

export type EditControlProps = EditButtonProps & SaveButtonProps

export type EditButtonProps = {
  editToggled: boolean
  toggleEdit: (editToggled: boolean) => void
}

export const SaveButton = memo(
  ({ isTouched, save }: SaveButtonProps) => (
    <button disabled={!isTouched} onClick={save}>
      save
    </button>
  )
)

export const EditButton = memo(
  ({ editToggled, toggleEdit }: EditButtonProps) => (
    <button onClick={() => toggleEdit(!editToggled)}>
      {editToggled ? 'cancel' : 'edit'}
    </button>
  )
)

export const EditControl = memo(
  ({ editToggled, toggleEdit, isTouched, save }: EditControlProps) => (
    <div>
      <EditButton {...{editToggled, toggleEdit}} />
      {
        editToggled && <SaveButton {...{isTouched, save}} />
      }
    </div>
  )
)
