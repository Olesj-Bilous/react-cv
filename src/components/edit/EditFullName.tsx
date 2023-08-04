import {memo} from 'react'
import { DisplayText, EditText } from "./EditText"
import { editTogglerFactory } from '../factories/editFactories'

export function EditFullName({ firstName, lastName }: EditValuePropsMap<Model & FullName>) {
  return (
    <>
      <EditText {...firstName} />
      <EditText {...lastName} />
    </>
  )
}

export const EditFullNameToggle = memo(editTogglerFactory(EditFullName, DisplayText))
