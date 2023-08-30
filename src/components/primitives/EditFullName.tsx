import { memo } from 'react'
import { DisplayText, EditText } from "./EditText"
import { simpleEditToggleFactory } from '../editable/factory.EditToggle'

export function EditFullName({ firstName, lastName }: EditValuePropsMap<Model & FullName>) {
  return (
    <>
      <EditText {...firstName} />
      <EditText {...lastName} />
    </>
  )
}

export const EditFullNameToggle = memo(simpleEditToggleFactory(EditFullName, DisplayText))
