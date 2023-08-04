import { useCallback, createElement, FC } from 'react'
import { useEditToggleContext } from '../../contexts/EditContext'


export type EditorConfig = {
  element: 'input' | 'textarea'
  type?: 'text' | 'date' | 'checkbox'
}

export function editorFactory<V extends string | boolean = string>({ element, type }: EditorConfig) {
  const valueAttribute = type === 'checkbox' ? 'checked' : 'value'
    
  return function Editor(
    { value, set }: EditValueProps<V>
  ) {
    const onChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>) => set(event.target[valueAttribute] as V),
      []
    )
    return createElement(element, { type, ...{[valueAttribute]: value}, onChange })
  }
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
