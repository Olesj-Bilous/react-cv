import { defineContext } from "./factory.Context"

export const [RatingScaleContext, useRatingScaleContext] = defineContext<{ scale: number }>('RatingScale', 'scale')