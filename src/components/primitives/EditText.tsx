import { memo } from 'react'
import { editorFactory } from './factory.Editor'
import { entoggleValueEdit } from '../editable/entoggle'

export const DisplayText = memo(({ display }: { display?: string }) => <>{display}</>)

export const EditText = memo(editorFactory({element:'input', type: 'text'}))

export const EditTextarea = memo(editorFactory({ element: 'textarea', props: {rows: 5}}))

export const EditTextToggle = memo(entoggleValueEdit({Edit: EditText, Display: DisplayText}))

export const EditTextareaToggle = memo(entoggleValueEdit({Edit: EditTextarea, Display: DisplayText}))
