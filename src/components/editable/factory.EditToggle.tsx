import { FC } from 'react'
import { useEditableContext } from '../../contexts/Editable.Context'

export const editToggleFactory = <E extends {}, D extends {}>(
  Editor: FC<E>,
  Display: FC<D>
) => function EditToggle({ edit, display }: {
  edit: E
  display: D
}) {
  const { editToggled } = useEditableContext()
  return editToggled ? <Editor {...edit} /> : <Display {...display} />
}

export const simpleEditToggleFactory = <E extends {}, D>(
  Editor: FC<E>,
  Display: FC<{ display: D }>
) => ({ edit, display }: {
  edit: E
  display: D
}) => editToggleFactory(Editor, Display)({ edit, display: { display } })
