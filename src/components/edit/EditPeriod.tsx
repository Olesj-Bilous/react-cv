import { editTogglerFactory, editorFactory } from "../factories/editFactories";
import { memo} from 'react'
import { DisplayText } from "./EditText";

export const EditBoolean = memo(editorFactory<boolean>({element:'input', type:'checkbox'}))

export const EditDate = memo(editorFactory({element:'input', type:'date'}))

export function EditPeriod({ startDate, endDate, toPresent }: EditValuePropsMap<Model & {
  startDate: string
  endDate: string
  toPresent: boolean
}>) {
  return (
    <>
      <EditDate {...startDate} />
      <EditDate {...endDate} />
      <EditBoolean {...toPresent} />
    </>
  )
}

export const EditPeriodToggle = editTogglerFactory(EditPeriod, DisplayText)
