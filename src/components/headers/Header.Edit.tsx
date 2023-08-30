import { headerFactory } from "./factory.Header"
import { EditTextToggle, EditTextareaToggle } from "../primitives/EditText"

export const EditHeader = headerFactory({
  Title: EditTextToggle,
  Subtitle: EditTextToggle,
  Introduction: EditTextareaToggle
})
