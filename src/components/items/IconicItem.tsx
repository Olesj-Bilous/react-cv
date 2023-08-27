import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { IconDefinition, IconName } from "@fortawesome/fontawesome-svg-core";

import { isUrl, isEmailAddress, isPhoneNumber } from "../../utils/stringChecks";
import { mapToArray } from "../../utils/mapQueries";
import { editToggleFactory, simpleEditToggleFactory } from "../factories/editFactories";
import { EditText } from "../edit/EditText";
import { Editable } from "../edit/Editable";
import { useZustand } from "../../hooks/useZustand";
import { useModelEditor } from "../../hooks/useModelEditor";

const icons: {
  [key: string]: IconDefinition
} = {
  'location-pin': icon({ name: 'location-pin' }),
  'envelope': icon({ name: 'envelope' }),
  'phone': icon({ name: 'phone' }),
  'github': icon({ name: 'github', style: 'brands' }),
  'default': icon({ name: 'fire' })
}

export function isIcon(name: string): name is Exclude<IconName, Exclude<IconName, keyof typeof icons>> {
  return name in icons
}

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
      display: {
        icon: isIcon(icon) ? icons[icon]! : icons['default']!
      },
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
      display: {
        icon: isIcon(icon.value) ? icons[icon.value]! : icons['default']!
      },
      edit: icon
    },
    item: {
      display: item.value,
      edit: item
    }
  }} ></IconicItemControl>
}

export function IconicItemControl({ icon, item, control, create }: {
  control: EditControl
  icon: {
    display: {
      icon: IconDefinition
    }
    edit: EditValueProps<string>
  }
  item: EditToggleProp<string>
  create?: boolean
}) {
  return (
    <Editable {...{...control, create}}>
      <div className="iconic">
        <div className="icon-ctn">
          <EditIconToggle {...icon} />
        </div>
        <div className="content">
          <EditContactToggle {...item} />
        </div>
      </div>
    </Editable>
  );
}

export function ContactText({ display }: { display: string }) {
  if (isUrl(display)) {
    return <a href={`//${display}`}>{display}</a>
  }
  if (isEmailAddress(display)) {
    return <a href={`mailto:${display}`}>{display}</a>
  }
  if (isPhoneNumber(display)) {
    return <a href={`tel:${display}`}>{display}</a>
  }
  return <>{ display }</>
}

export const EditContactToggle = simpleEditToggleFactory(EditText, ContactText)

export function SelectIcon({value, set}: EditValueProps<string>) {
  const iconList = mapToArray(icons)
  const selected = icons[value]?.iconName ?? iconList[0]?.iconName
  return (
    <select value={selected} onChange={e => set(e.target.value)}>
    {
      iconList.map(item => (
        <option value={item.iconName} key={item.iconName}>
          {item.iconName}
        </option>
      ))
    }
    </select>
  )
}

export const EditIconToggle = editToggleFactory(SelectIcon, FontAwesomeIcon)
