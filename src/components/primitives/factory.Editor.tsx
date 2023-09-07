import { useCallback, createElement, FC } from 'react'
import { useEditableContext } from '../../contexts/Editable.Context'


export type EditorConfig<E extends 'input' | 'textarea'> = {
  element: E
  type?: E extends 'textarea' ? never : 'text' | 'date' | 'month' | 'checkbox'
  props?: E extends 'textarea' ? React.HTMLProps<HTMLTextAreaElement> : React.HTMLProps<HTMLInputElement>
}

export function editorFactory<V extends string | boolean = string, E extends 'input' | 'textarea' = 'input'>({ element, type, props }: EditorConfig<E>) {
  const valueAttribute = type === 'checkbox' ? 'checked' : 'value'

  return function Editor(
    { state: [value, set], disabled }: StateProp<V> & { disabled?: boolean }
  ) {
    const onChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>) => set(event.target[valueAttribute] as V),
      []
    )
    return createElement(element, { type, ...{ [valueAttribute]: value }, disabled, onChange, ...props })
  }
}
