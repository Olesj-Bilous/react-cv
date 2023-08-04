import {useState} from 'react'
import { useZustand } from "../../hooks/useZustand";
import { Header, HeaderLevelContext } from "./Header";
import { EditToggleContext } from "../../contexts/EditContext";

export function SectionHeader({ id }: Model & React.Attributes) {

  return (
    <HeaderLevelContext.Provider value={{ level: 3 }}>
    </HeaderLevelContext.Provider>
  )
}
