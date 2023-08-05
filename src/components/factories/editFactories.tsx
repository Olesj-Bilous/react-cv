import { useCallback, createElement, FC } from 'react'
import { useEditableContext } from '../../contexts/EditContext'


export type EditorConfig = {
  element: 'input' | 'textarea'
  type?: 'text' | 'date' | 'checkbox'
}

export function editorFactory<V extends string | boolean = string>({ element, type }: EditorConfig) {
  const valueAttribute = type === 'checkbox' ? 'checked' : 'value'
    
  return function Editor(
    { value, set, disabled }: EditValueProps<V> & {disabled?:boolean}
  ) {
    const onChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>) => set(event.target[valueAttribute] as V),
      []
    )
    return createElement(element, { type, ...{[valueAttribute]: value}, disabled, onChange })
  }
}

export const editToggleFactory = <E extends {}, D extends {}>(
  Editor: FC<E>,
  Display: FC<D>
) => ({ edit, display }: {
  edit: E
  display: D
}) => {
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
