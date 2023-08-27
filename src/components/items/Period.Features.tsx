import { createContext, useContext } from "react";
import { EditPeriodHeader} from "../headers/Header.Period.Edit";


export function PeriodFeatures({ features, id }: Period & { features: PeriodFeature[] } & React.Attributes) {
  return (
    <article>
      <EditPeriodHeader id={id} />
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
