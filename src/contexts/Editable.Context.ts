import { createContext } from "react";
import { defineContext } from "./factory.Context";

export const [EditPermissionContext, useEditPermissionContext] = defineContext<{ allowEdit: boolean }>('EditPermission', 'allowEdit')

export interface EditableContext {
  editToggled: boolean
  toggleEdit: (value: boolean) => void
  isTouched: boolean
  revert: () => void
  save: () => void
}

export const [EditableContext, useEditableContext] = defineContext<EditableContext>('Editable')
