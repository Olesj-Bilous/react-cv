import { EditSectionHeader } from "./headers/Header.Section.Edit"
import { HeaderLevelContext } from "./headers/factory.Header"
import { useZustand } from "../hooks/useZustand"
import { useEditPermissionContext } from "../contexts/Editable.Context"
import { AddPeriodHeader } from "./headers/Header.Period.Add"


export function Section<I extends Model = Model>({ id, items, Component, AddComponent }
  : Section<I> & {
    Component: React.FC<I>
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
              <li key={item.id}>
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
