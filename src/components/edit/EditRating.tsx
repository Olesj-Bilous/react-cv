import { useState, useMemo } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { editToggleFactory } from "../factories/editFactories"

const [solid, regular] = [icon({ name: 'star', style: 'solid' }), icon({ name: 'star', style: 'regular' })]

export function Rating({ rating, scale, set }: {
  rating: number
  scale: number
} & {
  set?: (rating: number) => void
}) {
  const [intScale, scaledRating] = useMemo(() => {
    const intScale = Math.ceil(scale)
    const scaledRating = 0 < rating && rating <= 1 ? Math.ceil(rating * intScale) : 0
    return [intScale, scaledRating]
  }, [rating, scale])

  const [preview, setPreview] = useState(scaledRating)

  const editProps = useMemo(() => set && ((i: number) => ({
    onMouseEnter: () => setPreview(i + 1),
    onMouseLeave: () => setPreview(scaledRating),
    onClick: () => set((i + 1) / intScale)
  })), [intScale, scaledRating]) 

  const stars = []
  for (let i = 0; i < intScale; i++) {
    const star = i < preview ? solid : regular
    stars.push(
      <FontAwesomeIcon
        key={`${i}/${star.iconName}`}
        icon={star}
        {...(editProps && editProps(i))}
      />
    )
  }
  return <>{stars}</>
}

export function EditRating({ rating: {value, set}, scale }: {
  rating: EditValueProps<number>,
  scale: number
}) {
  return (
    <Rating key={`${value}/${scale}`} // key needed for fresh state
      {...{
        rating: value,
        scale,
        set
      }}
    />
  )
}

export const EditRatingToggle = editToggleFactory(EditRating, Rating)
