
import { createContext } from 'react'
import { useZustand } from '../../hooks/useZustand'
import { Editable } from '../editable/Editable'
import { EditRatingToggle } from '../primitives/EditRating'
import { EditTextToggle } from '../primitives/EditText'
import { useModelEditor } from '../../hooks/useModelEditor'

export const RatedSkillContext = createContext<null | number>(null)

export function AddRatedSkill({ eraId }: {eraId: string} ) {
  const modelSetter = useZustand(store => store.ratedSkillAdder(eraId))
  const { map, control } = useModelEditor({ modelSetter, toggled: true })
  return <RatedSkillControl {...{
    create: true,
    control,
    map
  }} />
}

export function EditRatedSkill({ id }: Model & RatedSkill & React.Attributes) {
  const { rating, skill } = useZustand(store => store.getModel('ratedSkills', id))
  const setter = useZustand(store => store.setModel<'ratedSkills', 'order' | 'era'>('ratedSkills')(id))
  const { map, control } = useModelEditor({
    modelSetter: [
      { rating, skill },
      setter
    ]
  })
  return (
    <RatedSkillControl {...{
      control,
      map
    }} />
  )
}

export function RatedSkillControl({ map: {skill, rating}, control, create }: {
  map: HookedMap<EditOrderedModel<RatedSkill>>
} & {
  control: EditControl
  create?: boolean
}) {
  return (
    <Editable {...{ ...control, create }}>
      <div className="rated-skill">
        <div className="skill">
          <EditTextToggle state={skill} />
        </div>
        <div className="rating">
          <EditRatingToggle state={rating} />
        </div>
      </div>
    </Editable>
  )
}
