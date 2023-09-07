import { memo } from 'react'
import { DisplayText, EditText } from "./EditText"
import { entoggleMapEdit } from '../editable/entoggle'

export function EditFullName({ firstName, lastName }: HookedMap<FullName>) {
  return (
    <>
      <EditText state={firstName} />
      <EditText state={lastName} />
    </>
  )
}

export function DisplayFullName({ firstName, lastName }: FullName) {
  return <>{`${firstName} ${lastName}`}</>
}

export const EditFullNameToggle = memo(entoggleMapEdit({Edit:EditFullName, Display:DisplayFullName}))
