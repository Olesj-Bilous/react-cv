import { memo } from 'react'
import { editorFactory } from '../editable/factory.Editor'
import { simpleEditToggleFactory } from '../editable/factory.EditToggle'

export const DisplayText = memo(({ display }: { display?: string }) => <div className="text">{display}</div>)

export const EditText = memo(editorFactory({element:'input', type: 'text'}))

export const EditTextarea = memo(editorFactory({ element: 'textarea', props: {rows: 5}}))

export const EditTextToggle = memo(simpleEditToggleFactory(EditText, DisplayText))

export const EditTextareaToggle = memo(simpleEditToggleFactory(EditTextarea, DisplayText))
