import { createContext } from "react";
import { contextFactory } from "./factory.Context";

export const [EditPermissionContext, useEditPermissionContext] = contextFactory<{ allowEdit: boolean }>('EditPermission', 'allowEdit')

export interface EditableContext {
  editToggled: boolean
  toggleEdit: (value: boolean) => void
  isTouched: boolean
  revert: () => void
  save: () => void
}

export const [EditableContext, useEditableContext] = contextFactory<EditableContext>('Editable')
