import { useState, useMemo } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { entoggleValueEdit } from "../editable/entoggle"
import { defineContext } from "../../contexts/factory.Context"
import { useRatingScaleContext } from "../../contexts/Rating.Context"

const [solid, regular] = [icon({ name: 'star', style: 'solid' }), icon({ name: 'star', style: 'regular' })]

export function Rating({ display: rating, set }: {
  display: number
} & {
  set?: (rating: number) => void
}) {
  const {scale} = useRatingScaleContext()
  const [intScale, scaledRating] = useMemo(() => {
    const intScale = Math.ceil(scale)
    const scaledRating = 0 < rating && rating <= 1 ? Math.ceil(rating * intScale) : 0
    return [intScale, scaledRating]
  }, [rating, scale])

  const [preview, setPreview] = useState(scaledRating)

  const editProps = useMemo(
    () => set && (
      (i: number) => ({
        onMouseEnter: () => setPreview(i + 1),
        onMouseLeave: () => setPreview(scaledRating),
        onClick: () => set((i + 1) / intScale)
      })
    ),
    [intScale, scaledRating /*, set */]
  ) 

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
  return <div className="rating">{stars}</div>
}

export function EditRating({ state: [value, set] }: {
  state: HookedValue<number>,
}) {
  return (
    <Rating key={value} // key needed for fresh state
      {...{
        display: value,
        set
      }}
    />
  )
}

export const EditRatingToggle = entoggleValueEdit({Edit:EditRating,Display: Rating})
