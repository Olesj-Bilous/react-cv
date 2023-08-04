import { useState , useCallback, useMemo, createElement, memo} from "react";
import { headerFactory, HeaderLevelContext } from "./Header";
import { EditToggleContext, useEditPermissionContext } from "../../contexts/EditContext";
import { useLocalEditor } from "../../hooks/useLocalEditor"; 
import { useZustand } from "../../hooks/useZustand";
import { EditText, EditTextToggle, EditTextarea, EditTextareaToggle } from "../edit/EditText";
import { EditFullName, EditFullNameToggle } from "../edit/EditFullName";
import { EditControl, Editable } from "../edit/EditControl";

const ProfileHeader = memo(headerFactory({
  Title: EditFullNameToggle,
  Subtitle: EditTextToggle,
  Introduction: EditTextareaToggle
}))

export function ProfileHeaderControl({ id }: Model & { img: string }) {
  const {title, subtitle, introduction} = useZustand(store => store.getHeaderProps('profiles', id))

  const profileSetter = useZustand(store => store.profileSetter(id))
  const {
    control,
    content: { firstName, lastName, profession, description }
  } = useLocalEditor({ modelSetter: profileSetter })

  return (
    <Editable {...control}>
      <HeaderLevelContext.Provider value={{ level: 1 }} >
        <ProfileHeader {...{
          title: {
            display: {
              display: title
            },
            edit: {
              firstName,
              lastName
            }
          },
          subtitle: {
            display: {
              display: subtitle
            },
            edit: profession
          },
          introduction: {
            display: {
              display: introduction
            },
            edit: description
          }
        }} />
      </HeaderLevelContext.Provider>
    </Editable>
  )
}
