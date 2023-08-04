import { createContext } from "react";
import { contextFactory } from "./contextFactory";

export const [ EditPermissionContext, useEditPermissionContext ] = contextFactory <{ allowEdit: boolean }>('EditPermission', 'allowEdit')

export const [EditToggleContext, useEditToggleContext] = contextFactory<{
  editToggled: boolean
  toggleEdit: (value: boolean) => void
  isTouched: boolean
  revert: () => void
  save: () => void
}>('EditToggle', 'editToggled')
