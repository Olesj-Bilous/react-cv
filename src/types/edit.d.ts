

interface EditableContext {
  editToggled: boolean
  toggleEdit: (value: boolean) => void
  isTouched: boolean
  revert: () => void
  save: () => void
}
