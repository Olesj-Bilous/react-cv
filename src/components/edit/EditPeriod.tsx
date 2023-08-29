import { editToggleFactory, editorFactory, simpleEditToggleFactory } from "../factories/editFactories";
import { memo} from 'react'
import { DisplayText } from "./EditText";

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
