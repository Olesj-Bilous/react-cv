

import { EditPeriodToggle } from "../primitives/EditPeriod";
import { EditTextToggle, EditTextareaToggle } from "../primitives/EditText";
import { headerFactory } from "./factory.Header";

export const PeriodHeader = headerFactory({
  Title: EditTextToggle,
  Subtitle: EditTextToggle,
  Introduction: EditTextareaToggle,
  Epilogue: EditPeriodToggle
})
