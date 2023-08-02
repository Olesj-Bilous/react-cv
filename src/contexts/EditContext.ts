import { createContext } from "react";
import { contextFactory } from "./contextFactory";

export const { Context: EditPermissionContext, hook: useEditPermissionContext } = contextFactory <{ allowEdit: boolean }>('EditPermission', 'edit')

export const {Context: EditToggleContext, hook: useEditToggleContext} = contextFactory<{editToggled: boolean}>('EditToggle', 'editToggled')
