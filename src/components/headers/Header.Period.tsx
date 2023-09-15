

import { PeriodToggle } from "../primitives/PeriodEdit";
import { EditOptionalTextToggle, EditOptionalTextareaToggle, EditTextToggle, EditTextareaToggle } from "../primitives/EditText";
import { headerFactory } from "./factory.Header";

export const PeriodHeader = headerFactory({
  Title: EditTextToggle,
  Subtitle: EditOptionalTextToggle,
  Introduction: EditOptionalTextareaToggle,
  Epilogue: PeriodToggle
})
