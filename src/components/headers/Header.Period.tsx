
import { EditableContext } from "../../contexts/EditContext";
import { displayPeriod, displayPeriodFromInput } from "../../hooks/queries";
import { useModelEditor } from "../../hooks/useModelEditor";
import { useZustand } from "../../hooks/useZustand";
import { Editable } from "../edit/Editable";
import { EditPeriod, EditPeriodToggle } from "../edit/EditPeriod";
import { EditTextToggle, EditTextareaToggle } from "../edit/EditText";
import { useDateFormatContext, useDateSettingsContext } from "../items/Period";
import { headerFactory, HeaderLevelContext } from "./Header.factory";

export const PeriodHeader = headerFactory({
  Title: EditTextToggle,
  Subtitle: EditTextToggle,
  Introduction: EditTextareaToggle,
  Epilogue: EditPeriodToggle
})
