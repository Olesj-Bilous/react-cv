import { simpleEditToggleFactory } from "./factory.EditToggle";
import { editorFactory } from "./factory.Editor";
import { memo} from 'react'
import { DisplayText } from "../primitives/EditText";

export const EditBoolean = memo(editorFactory<boolean>({element:'input', type:'checkbox'}))

export const EditDate = memo(editorFactory({element:'input', type:'month'}))

export function EditPeriod({ startDate, endDate, toPresent }: EditValuePropsMap<Model & {
  startDate: string
  endDate: string
  toPresent: boolean
}>) {
  return (
    <>
      <EditDate {...startDate} />
      <EditDate disabled={toPresent.value} {...endDate} />
      <EditBoolean {...toPresent} />
    </>
  )
}

export const EditPeriodToggle = simpleEditToggleFactory(EditPeriod, DisplayText)
