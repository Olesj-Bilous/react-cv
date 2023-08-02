import {useState} from 'react'
import { useZustand } from "../../hooks/useZustand";
import { Header, HeaderLevelContext } from "./Header";
import { EditToggleContext } from "../../contexts/EditContext";

export function SectionHeader({ id }: Model & React.Attributes) {
  const { value, set } = useZustand(store => store.eraTitleSetter(id))
  const [editToggled, toggleEdit] = useState(false)

  return (
    <HeaderLevelContext.Provider value={{ level: 3 }}>
      <EditToggleContext.Provider value={{ editToggled }}>
        <Header title={{ display: { display: value }, edit: { value, set } }} />
      </EditToggleContext.Provider>
    </HeaderLevelContext.Provider>
  )
}
