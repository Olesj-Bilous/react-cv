import { memo} from "react";
import { headerFactory, HeaderLevelContext } from "./factory.Header";
import { useModelEditor } from "../../hooks/useModelEditor"; 
import { useZustand } from "../../hooks/useZustand";
import { EditTextToggle, EditTextareaToggle } from "../primitives/EditText";
import { EditFullNameToggle } from "../primitives/EditFullName";
import { Editable } from "../editable/Editable";
import { EditImage } from "../primitives/EditImage";
import { liquifyMap } from "../editable/entoggle";

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
    map: { firstName, lastName, img, profession, description }
  } = useModelEditor({ modelSetter: profileSetter })

  return (
    <header>
      <Editable {...control}>
        <HeaderLevelContext.Provider value={{ level: 1 }} >
          <ProfileHeader {...{
            title: {
              firstName,
              lastName
            },
            ...liquifyMap({
            subtitle: profession,
            introduction: description,
            prelude: img})
          }} />
        </HeaderLevelContext.Provider>
      </Editable>
    </header>
  )
}
