import { EditSectionHeader } from "./headers/Header.Section.Edit"
import { HeaderLevelContext } from "./headers/Header.factory"
import { useZustand } from "../hooks/useZustand"
import { useEditPermissionContext } from "../contexts/EditContext"
import { AddPeriodHeader } from "./headers/Header.Period.Add"


export function Section<TProps extends Model>({ id, items, Component, AddComponent }
  : Model & Omit<Section<TProps>, 'title'> & {
    Component: React.FC<TProps>
    AddComponent?: React.FC<{eraId: string}>
  }
) {
  const {allowEdit}=useEditPermissionContext()

  return (
    <section>
      <EditSectionHeader {...{id}} />
      <ul>
        <HeaderLevelContext.Provider value={{ level: 4 }}>
          {
            items.map((item, i) => (
              <li key={i}>
                <Component {...item} />
              </li>
            ))
          }
          {
            allowEdit && AddComponent && <li>
              <AddComponent eraId={id} /> 
            </li>
          }
        </HeaderLevelContext.Provider>
      </ul>
    </section>
  )
}
