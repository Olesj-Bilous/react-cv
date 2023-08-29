import { createContext, useContext } from "react";
import { EditPeriodHeader} from "../headers/Header.Period.Edit";
import { AddFeature, EditFeature } from "./Feature";
import { useEditPermissionContext } from "../../contexts/EditContext";


export function PeriodFeatures({ features, id }: Period & { features: PeriodFeature[] } & React.Attributes) {
  const {allowEdit} = useEditPermissionContext()
  return (
    <article>
      <EditPeriodHeader id={id} />
      <ul>
        {
          features.map((feature) => (
            <li key={feature.id}>
              <EditFeature id={feature.id} />
            </li>
          ))
        }
        {allowEdit && <li key="new">
          <AddFeature periodId={id} />
        </li>}
      </ul>
    </article>
  )
}
