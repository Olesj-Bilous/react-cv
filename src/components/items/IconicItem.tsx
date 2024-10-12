import { Editable } from "../editable/Editable";
import { useZustand } from "../../hooks/useZustand";
import { EditIconToggle } from "../primitives/EditIcon";
import { useModelEditor } from "../../hooks/useModelEditor";
import { EditTextToggle, EditTextareaToggle } from "../primitives/EditText";
import { useEditPermissionContext } from "../../contexts/Editable.Context";

export function EditIconicItem({ id }: Model) {
  const { set } = useZustand(store => store.iconicItemControl().set({ id }))
  const deleteM = useZustand(store => store.deleteModel('iconicItems', id))

  const { control, map } = useModelEditor({
    modelSetter: set
  })

  return <IconicItemControl {...{
    control,
    map,
    deleteM: 2 < parseInt(id) ? deleteM : undefined
  }} />
}

export function AddIconicItem({ eraId }: { eraId: string }) {
  const { add } = useZustand(store => store.iconicItemControl().add({ eraId }))

  const { control, map } = useModelEditor({
    modelSetter: add,
    toggled: true
  })

  return <IconicItemControl {...{
    create: true,
    control,
    map
  }} />
}

export interface IconicItemSet { icon: string, item: string, title: string }

export function IconicItemControl({ control, map: { icon, item, title }, create, deleteM }: {
  control: EditControl
  map: DeepHookedMap<IconicItemSet>
  create?: boolean
  deleteM?: () => void
}) {
  const { allowEdit } = useEditPermissionContext()
  const { editToggled } = control
  return (
    <Editable {...{ ...control, create, deleteM }}>
      <div className="iconic">
        <div className="icon-ctn">
          <EditIconToggle state={icon} />
        </div>
        <div className="item">
          <EditTextareaToggle state={item} />
        </div>
        {
          allowEdit && editToggled && <div><EditTextToggle state={title} /></div>
        }
      </div>
    </Editable>
  );
}
