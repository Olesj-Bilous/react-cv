import { useZustand } from "../../hooks/useZustand";
import { HeaderLevelContext } from "./factory.Header";
import { EditHeader } from './Header.Edit';
import { Editable } from '../editable/Editable';
import { useValueEditor } from "../../hooks/useValueEditor";

export function EditSectionHeader({ id }: Model & React.Attributes) {
  const { title } = useZustand(store => store.getHeaderProps('eras', id))
  const {set} = useZustand(store => store.eraTitleSetter(id))
  const { content, control } = useValueEditor({
    globalValue: [title, set]
  })

  return (
    <header>
      <HeaderLevelContext.Provider value={{ level: 3 }}>
        <Editable {...control}>
          <EditHeader {...{
            title: {
              state: content
            }
          }} />
        </Editable>
      </HeaderLevelContext.Provider>
    </header>
  )
}
