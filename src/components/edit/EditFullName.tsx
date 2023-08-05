import {memo} from 'react'
import { DisplayText, EditText } from "./EditText"
import { editToggleFactory, simpleEditToggleFactory } from '../factories/editFactories'

export function EditFullName({ firstName, lastName }: EditValuePropsMap<Model & FullName>) {
  return (
    <>
      <EditText {...firstName} />
      <EditText {...lastName} />
    </>
  )
}

export const EditFullNameToggle = memo(simpleEditToggleFactory(EditFullName, DisplayText))
