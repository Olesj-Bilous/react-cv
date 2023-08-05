import { headerFactory } from "./Header.factory"
import { EditTextToggle, EditTextareaToggle } from "../edit/EditText"

export const EditHeader = headerFactory({
  Title: EditTextToggle,
  Subtitle: EditTextToggle,
  Introduction: EditTextareaToggle
})
