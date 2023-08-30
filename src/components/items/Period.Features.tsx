import { EditPeriodHeader} from "../headers/Header.Period.Edit";
import { AddFeature, EditFeature } from "./Feature";
import { useEditPermissionContext } from "../../contexts/Editable.Context";


export function PeriodFeatures({ features, id }: Model & { features: string[] } & React.Attributes) {
  const {allowEdit} = useEditPermissionContext()
  return (
    <article>
      <EditPeriodHeader id={id} />
      <ul>
        {
          features.map((feature) => (
            <li key={feature}>
              <EditFeature id={feature} />
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
