import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { entoggleValueEdit } from "../editable/entoggle";

const icons = {
  'location-pin': icon({ name: 'location-pin' }),
  'envelope': icon({ name: 'envelope' }),
  'phone': icon({ name: 'phone' }),
  'github': icon({ name: 'github', style: 'brands' }),
  'server': icon({ name: 'server' }),
  'database': icon({ name: 'database' }),
  'globe': icon({ name: 'globe' }),
  'js': icon({ name: 'js', style: 'brands' }),
  'flask': icon({ name: 'flask' }),
  'calculator': icon({ name: 'calculator' }),
  'desktop': icon({ name: 'desktop' }),
  'default': icon({ name: 'fire' })
}

export function isIconicKey(name: string): name is keyof typeof icons {
  return name in icons
}

export function SelectIcon({ state: [value, set] }: StateProp<string>) {
  const selected = isIconicKey(value) ? icons[value].iconName : 'none'
  return (
    <select value={selected} onChange={e => set(e.target.value)}>
      <option value="none">--none--</option>
      {
        Object.values(icons).map(item => (
          <option value={item.iconName} key={item.iconName}>
            {item.iconName}
          </option>
        ))
      }
    </select>
  )
}

export function DisplayIcon({ display }: { display: string }) {
  const icon = isIconicKey(display) && icons[display]
  return <div className="icon">
    { icon && <FontAwesomeIcon icon={icon} /> }
  </div>
}

export const EditIconToggle = entoggleValueEdit({Edit:SelectIcon, Display:DisplayIcon})
