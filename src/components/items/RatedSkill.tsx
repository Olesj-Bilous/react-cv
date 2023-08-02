
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { createContext, useContext } from 'react'

export const RatedSkillContext = createContext<null | number>(null)

export function RatedSkill({ rating, skill }: RatedSkill & React.Attributes) {
  const scale = useContext(RatedSkillContext)
  if (scale == null)
    throw new Error('No scale value was provided to RatedSkillContext')

  const stars = []
  for (let i = 0; i < scale; i++) {
    const star = i < rating
      ? icon({ name: 'star', style: 'solid' })
      : icon({ name: 'star', style: 'regular' })
    
    stars.push(
      <FontAwesomeIcon key={i} icon={star} />
    )
  }

  return (
    <div className="rated-skill">
      <div className="skill">
        {skill}
      </div>
      <div className="rating">
        {stars}
      </div>
    </div>
  )
}
