import { isUrl, isEmailAddress, isPhoneNumber } from "../../utils/checks/stringRefinery";
import { simpleEditToggleFactory } from "../editable/factory.EditToggle";
import { EditText } from "./EditText";

export function ContactText({ display }: { display: string }) {
  if (isEmailAddress(display)) {
    return <a href={`mailto:${display}`}>{display}</a>
  }
  if (isUrl(display)) { // url could be email address...
    return <a href={`//${display}`}>{display}</a>
  }
  if (isPhoneNumber(display)) {
    return <a href={`tel:${display}`}>{display}</a>
  }
  return <>{display}</>
}

export const EditContactToggle = simpleEditToggleFactory(EditText, ContactText)
