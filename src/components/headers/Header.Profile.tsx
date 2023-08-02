import { useState , useCallback, useMemo, createElement, memo} from "react";
import { headerFactory, HeaderLevelContext } from "./Header";
import { EditToggleContext, useEditPermissionContext } from "../../contexts/EditContext";
import { useLocalEditor } from "../../hooks/useLocalEditor"; 
import { useZustand } from "../../hooks/useZustand";
import { EditText, EditTextToggle, EditTextarea } from "../edit/EditText";
import { EditFullName, EditFullNameToggle } from "../edit/EditFullName";
import { EditControl } from "../edit/EditControl";

const ProfileHeader = memo(headerFactory(
  EditFullNameToggle, EditTextToggle, EditTextToggle
))

export function ProfileHeaderControl({ id }: Model & { img: string }) {
  const profileSetter = useZustand(store => store.profileSetter(id))
  const {title, subtitle, introduction} = useZustand(store => store.getHeaderProps('profiles', id))

  const {
    allowEdit, editToggled, toggleEdit, save, isTouched,
    firstName, lastName, profession, description
  } = useLocalEditor({ modelSetter: profileSetter })
  
  const content = (
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
              display: subtitle ?? ''
            },
            edit: profession
          },
        introduction: {
          display: {
              display: introduction ?? ''
          },
          edit: description
          }
        }} />
    </HeaderLevelContext.Provider>
  )

  return (
    <EditToggleContext.Provider value={{ editToggled }}>
      { allowEdit
          ? createElement('div', null, (
              <>
                {content}
                <EditControl {...{editToggled, toggleEdit, isTouched, save}} />
              </>
            ))
          : <>{content}</>
      }
    </EditToggleContext.Provider>
  )
}
