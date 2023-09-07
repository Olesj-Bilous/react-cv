import { Editable } from "../editable/Editable";
import { useZustand } from "../../hooks/useZustand";
import { EditContactToggle } from "../primitives/EditContactText";
import { EditIconToggle } from "../primitives/EditIcon";
import { useModelEditor } from "../../hooks/useModelEditor";

export function EditIconicItem({ id }: Model) {
  const { set } = useZustand(store => store.iconicItemControl().set({ id }))

  const { control, map } = useModelEditor({
    modelSetter: set
  })

  return <IconicItemControl {...{
    control,
    map
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

export interface IconicItemSet { icon: string, item: string }

export function IconicItemControl({ control, map: { icon, item }, create }: {
  control: EditControl
  map: DeepHookedMap<IconicItemSet>
  create?: boolean
}) {
  return (
    <Editable {...{ ...control, create }}>
      <div className="iconic">
        <div className="icon-ctn">
          <EditIconToggle state={icon} />
        </div>
        <div className="item">
          <EditContactToggle state={item} />
        </div>
      </div>
    </Editable>
  );
}
