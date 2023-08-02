import { useCallback, createElement, FC } from 'react'
import { useEditToggleContext } from '../../contexts/EditContext'


export const valueEditorFactory = (element: 'input' | 'textarea', type?: string) => (
  { value, set }: EditValueProps<string>
) => {
  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => set(event.target.value), [set])
  return createElement(element, { type, value, onChange })
}

export const editTogglerFactory = <E extends {}, D extends {}>(
  Editor: FC<E>,
  Display: FC<D>
) => ({ display, edit }: {
  display: D
  edit: E
}) => {
  const { editToggled } = useEditToggleContext()
  return editToggled ? <Editor {...edit} /> : <Display {...display} />
}
