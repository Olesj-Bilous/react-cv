import { memo } from 'react'
import { editTogglerFactory, editorFactory } from '../factories/editFactories'

export const DisplayText = memo(({ display }: { display?: string }) => <>{display}</>)

export const EditText = memo(editorFactory({element:'input', type: 'text'}))

export const EditTextarea = memo(editorFactory({element:'textarea'}))

export const EditTextToggle = memo(editTogglerFactory(EditText, DisplayText))

export const EditTextareaToggle = memo(editTogglerFactory(EditTextarea, DisplayText))
