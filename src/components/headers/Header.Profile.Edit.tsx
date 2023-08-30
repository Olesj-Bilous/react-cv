import { memo} from "react";
import { headerFactory, HeaderLevelContext } from "./factory.Header";
import { useModelEditor } from "../../hooks/useModelEditor"; 
import { useZustand } from "../../hooks/useZustand";
import { EditTextToggle, EditTextareaToggle } from "../primitives/EditText";
import { EditFullNameToggle } from "../primitives/EditFullName";
import { Editable } from "../editable/Editable";
import { EditImage } from "../primitives/EditImage";

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
    content: { firstName, lastName, profession, description, img }
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
            prelude: img
          }} />
        </HeaderLevelContext.Provider>
      </Editable>
    </header>
  )
}
