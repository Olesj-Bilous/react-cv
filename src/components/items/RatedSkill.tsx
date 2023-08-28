
import { createContext, useContext } from 'react'
import { useZustand } from '../../hooks/useZustand'
import { Editable } from '../edit/Editable'
import { useModelEditor } from '../../hooks/useModelEditor'
import { EditRatingToggle } from '../edit/EditRating'
import { EditTextToggle } from '../edit/EditText'

export const RatedSkillContext = createContext<null | number>(null)

export function AddRatedSkill({ eraId }: {eraId: string} ) {
  const modelSetter = useZustand(store => store.ratedSkillAdder(eraId))
  const { content: {rating, skill}, control } = useModelEditor({ modelSetter, toggled: true })
  return <RatedSkillControl {...{
    create: true,
    control,
    skill: {
      display: skill.value,
      edit: skill
    },
    rating: {
      display: {
        rating: rating.value,
        scale: 5
      },
      edit: {
        rating,
        scale: 5
      }
    }
  }} />
}

export function EditRatedSkill({ id }: Model & RatedSkill & React.Attributes) {
  const { rating, skill } = useZustand(store => store.getModel('ratedSkills', id))
  const setter = useZustand(store => store.setModel<'ratedSkills', 'order' | 'era'>('ratedSkills')(id))
  const { content, control } = useModelEditor<RatedSkill, 'order' | 'era'>({
    modelSetter: [
      { rating, skill },
      setter
    ]
  })
  return (
    <RatedSkillControl {...{
      control,
      skill: {
        display: skill,
        edit: content.skill
      },
      rating: {
        display: {
          rating,
          scale: 5
        },
        edit: {
          rating: content.rating,
          scale: 5
        }
      }
    }} />
  )
}

export function RatedSkillControl({ rating, skill, control, create }: {
  rating: {
    display: {
      rating: number
      scale: number
    }
    edit: {
      rating: EditValueProps<number>
      scale: number
    }
  }
  skill: EditToggleProp<string>
} & {
  control: EditControl
  create?: boolean
}) {
  return (
    <Editable {...{ ...control, create }}>
      <div className="rated-skill">
        <div className="skill">
          <EditTextToggle {...skill} />
        </div>
        <div className="rating">
          <EditRatingToggle {...rating} />
        </div>
      </div>
    </Editable>
  )
}
