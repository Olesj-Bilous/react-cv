import { FC, Fragment, memo } from 'react'
import { editorFactory } from './factory.Editor'
import { entoggleValueEdit } from '../editable/entoggle'
import { isUrl } from '../../utils/checks/stringRefinery'
import { ContactText } from './EditContactText'
import { hyperize } from '../../utils/hyperize'

export const DisplayText = memo(({ display }: { display?: string }) => {
  if (!display) return <></>
  const hypermap = hyperize(display, (i, text, url) => <Fragment key={i}>
    {
      url ? <a href={url}>{text}</a> : text
    }
  </Fragment>)
  return <>{hypermap}</>
})

export const EditText = memo(editorFactory({ element: 'input', type: 'text' }))

export const EditOptionalText = memo(decompulseEditor(EditText, () => '', acceptOptionalString))

export function decompulseEditor<T>(
  Editor: FC<{ state: HookedValue<T> }>,
  instantiate: () => T,
  accept: (value: T) => T | undefined
) {
  return function OptionalEditor({ state: [value, set] }: { state: HookedValue<T | undefined> }) {
    const strictValue = value ?? instantiate()
    const strictSet = (value: T) => set(accept(value))
    return <Editor state={[strictValue, strictSet]} />
  }
}

export function acceptOptionalString(value: string) {
  return value.trim() === '' ? undefined : value
}

export const EditTextarea = memo(editorFactory({ element: 'textarea', props: { rows: 5 } }))

export const EditOptionalTextarea = memo(decompulseEditor(EditTextarea, () => '', acceptOptionalString))

export const EditTextToggle = memo(entoggleValueEdit({ Edit: EditText, Display: DisplayText }))

export const EditOptionalTextToggle = entoggleValueEdit({ Edit: EditOptionalText, Display: DisplayText })

export const EditTextareaToggle = memo(entoggleValueEdit({ Edit: EditTextarea, Display: DisplayText }))

export const EditOptionalTextareaToggle = entoggleValueEdit({ Edit: EditOptionalTextarea, Display: DisplayText })
