import { memo } from 'react'
import { editTogglerFactory, valueEditorFactory } from '../factories/editFactory'

export const DisplayText = memo(({ display }: { display: string }) => <>{display}</>)

export const EditText = memo(valueEditorFactory('input'))

export const EditTextarea = memo(valueEditorFactory('textarea'))

export const EditTextToggle = memo(editTogglerFactory(EditText, DisplayText))

export const EditTextareaToggle = memo(editTogglerFactory(EditTextarea, DisplayText))
