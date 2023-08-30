import { Editable } from "../editable/Editable";
import { useZustand } from "../../hooks/useZustand";
import { useModelEditor } from "../../hooks/useModelEditor";
import { EditContactToggle } from "../primitives/EditContactText";
import { EditIconToggle } from "../primitives/EditIcon";

export function EditIconicItem({ id }: Model) {
  const model = useZustand(store => store.getModel('iconicItems', id))
  const set = useZustand(store => store.setModel('iconicItems')(id))
  const { content, control } = useModelEditor<IconicItem, 'era'|'order'>({
    modelSetter: [
      model, set
    ]
  })

  const { icon, item } = model
  const { icon: setIcon, item: setItem } = content

  return <IconicItemControl {...{
    control,
    icon: {
      display: icon,
      edit: setIcon
    },
    item: {
      display: item,
      edit: setItem
    }
  }} />
}

export function AddIconicItem({ eraId }: { eraId: string }) {
  const setter = useZustand(store => store.iconicItemAdder(eraId))
  const {
    control,
    content: { icon, item }
  } = useModelEditor({ modelSetter: setter,
    toggled: true })
  
  return <IconicItemControl {...{
    create: true,
    control,
    icon: {
      display: icon.value,
      edit: icon
    },
    item: {
      display: item.value,
      edit: item
    }
  }} />
}

export function IconicItemControl({ icon, item, control, create }: {
  control: EditControl
  icon: {
    display: string
    edit: EditValueProps<string>
  }
  item: EditToggleProp<string>
  create?: boolean
}) {
  return (
    <Editable {...{ ...control, create }}>
      <div className="iconic">
        <div className="icon-ctn">
          <EditIconToggle {...icon} />
        </div>
        <div className="item">
          <EditContactToggle {...item} />
        </div>
      </div>
    </Editable>
  );
}
