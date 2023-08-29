import { useState } from "react";
import { useEditPermissionContext } from "../../contexts/EditContext";


export function EditImage({ img }: { img?: string }) {
  const { allowEdit } = useEditPermissionContext()
  const [src, setSrc] = useState(img ?? '~/john-wayne.webp')
  return (
    <div className="img">
      <img src={src} alt="profile" />
      {
        allowEdit &&
          <input
            type="file"
            accept="image/*"
            onChange={event => event.target.files?.[0] && setSrc(URL.createObjectURL(event.target.files[0]))}
          />
        }
    </div>
  )
}
