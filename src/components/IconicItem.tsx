import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

import { isUrl, isEmailAddress, isPhoneNumber } from "../utils/stringChecks";

const icons: {
  [key: string]: IconDefinition
} = {
  'map-marker': icon({ name: 'map-marker' }),
  'envelope': icon({ name: 'envelope' }),
  'phone': icon({ name: 'phone' }),
  'github': icon({ name: 'github', style: 'brands' }),
  'default': icon({ name: 'fire' })
}

export function IconicItem({ icon, item }: IconicItem & React.Attributes) {
  let content;
  if (Array.isArray(item)) {
    content = item.join(', ')
  } else if (isUrl(item)) {
    content = <a href={`//${item}`}>{item}</a>
  } else if (isEmailAddress(item)) {
    content = <a href={`mailto:${item}`}>{item}</a>
  } else if (isPhoneNumber(item)) {
    content = <a href={`tel:${item}`}>{item}</a>
  } else {
    content = item;
  }
  
  return (
    <div className="iconic">
      <div className="icon-ctn">
      {      
        <FontAwesomeIcon icon={
          icons[icon]
            ? icons[icon]
            : icons['default']
        } />
      }
      </div>
      <div className="content">
        {content}
      </div>
    </div>
  );
}
