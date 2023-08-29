import { useState } from "react";
import { useEditPermissionContext, useEditableContext } from "../../contexts/EditContext";


export function EditImage({ value, set }: EditValueProps<string>) {
  const { editToggled } = useEditableContext()
  return (
    <div className="img">
      <img src={value} alt="profile" />
      {
        editToggled &&
          <input
            type="file"
            accept="image/*"
            onChange={event => event.target.files?.[0] && set(URL.createObjectURL(event.target.files[0]))}
          />
        }
    </div>
  )
}
