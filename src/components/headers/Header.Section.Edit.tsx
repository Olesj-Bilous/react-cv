import {useState} from 'react'
import { useZustand } from "../../hooks/useZustand";
import { HeaderLevelContext } from "./Header.factory";
import { EditHeader } from './Header.Edit';
import { EditableContext } from "../../contexts/EditContext";
import { useValueEditor } from '../../hooks/useValueEditor';
import { Editable } from '../edit/Editable';

export function EditSectionHeader({ id }: Model & React.Attributes) {
  const { title } = useZustand(store => store.getHeaderProps('eras', id))
  const setTitle = useZustand(store => store.eraTitleSetter(id))
  const { content, control } = useValueEditor(setTitle)

  return (
    <HeaderLevelContext.Provider value={{ level: 3 }}>
      <Editable {...control}>
        <EditHeader {...{
          title: {
            display: title,
            edit: content
          }
        }} />
      </Editable>
    </HeaderLevelContext.Provider>
  )
}
