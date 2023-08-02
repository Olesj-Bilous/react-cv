import { createContext, useContext } from "react";
import { PeriodHeaderControl } from "../headers/Header.Period";


export const EditPeriodContext = createContext<null | {
  edit: boolean
}>(null)

export function PeriodFeatures({ features, ...props }: Period & { features: PeriodFeature[] } & React.Attributes) {
  /*const editContext = useContext(EditPeriodContext)
  if (editContext == null)
    throw new Error('No value was provided for EditPeriodContext')
  const { edit } = editContext*/

  return (
    <article>
      <PeriodHeaderControl {...props} />
      <ul>
        {
          features.map((feature) => (
            <li key={feature.id}>
              {feature.feature}
            </li>
          ))
        }
      </ul>
    </article>
  )
}
