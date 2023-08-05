import { createContext } from "react";
import { contextFactory } from "./contextFactory";

export const [ EditPermissionContext, useEditPermissionContext ] = contextFactory <{ allowEdit: boolean }>('EditPermission', 'allowEdit')

export const [EditableContext, useEditableContext] = contextFactory<EditableContext>('Editable')
