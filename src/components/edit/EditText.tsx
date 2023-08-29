import { memo } from 'react'
import { editToggleFactory, editorFactory, simpleEditToggleFactory } from '../factories/editFactories'

export const DisplayText = memo(({ display }: { display?: string }) => <div className="text">{display}</div>)

export const EditText = memo(editorFactory({element:'input', type: 'text'}))

export const EditTextarea = memo(editorFactory({element:'textarea'}))

export const EditTextToggle = memo(simpleEditToggleFactory(EditText, DisplayText))

export const EditTextareaToggle = memo(simpleEditToggleFactory(EditTextarea, DisplayText))
