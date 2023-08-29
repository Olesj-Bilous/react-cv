import { useState , useCallback, useMemo, createElement, memo} from "react";
import { headerFactory, HeaderLevelContext } from "./Header.factory";
import { EditableContext, useEditPermissionContext } from "../../contexts/EditContext";
import { useModelEditor } from "../../hooks/useModelEditor"; 
import { useZustand } from "../../hooks/useZustand";
import { EditText, EditTextToggle, EditTextarea, EditTextareaToggle } from "../edit/EditText";
import { EditFullName, EditFullNameToggle } from "../edit/EditFullName";
import { Editable } from "../edit/Editable";
import { EditImage } from "../edit/EditImage";

const ProfileHeader = memo(headerFactory({
  Title: EditFullNameToggle,
  Subtitle: EditTextToggle,
  Introduction: EditTextareaToggle,
  Prelude: EditImage
}))

export function EditProfileHeader({ id }: Model & { img: string }) {
  const { title, subtitle, introduction } = useZustand(store => store.getHeaderProps('profiles', id))

  const profileSetter = useZustand(store => store.profileSetter(id))
  const {
    control,
    content: { firstName, lastName, profession, description }
  } = useModelEditor({ modelSetter: profileSetter })

  return (
    <header>
      <Editable {...control}>
        <HeaderLevelContext.Provider value={{ level: 1 }} >
          <ProfileHeader {...{
            title: {
              display: title,
              edit: {
                firstName,
                lastName
              }
            },
            subtitle: {
              display: subtitle,
              edit: profession
            },
            introduction: {
              display: introduction,
              edit: description
            },
            prelude: {}
          }} />
        </HeaderLevelContext.Provider>
      </Editable>
    </header>
  )
}
