import { useEditableContext } from "../../contexts/Editable.Context";

export function EditImage({ state:[value, set] }: {state:HookedValue<string>}) {
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
