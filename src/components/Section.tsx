import { SectionHeader } from "./headers/Header.Section"
import { HeaderLevelContext } from "./headers/Header"


export function Section<TProps extends Model>({ id, title, items, Component }: Model & Section<TProps> & { Component: ({...props}: TProps & React.Attributes) => JSX.Element}) {
  return (
    <section>
      <SectionHeader {...{id}} />
      <ul>
        <HeaderLevelContext.Provider value={{ level: 4 }}>
        {
          items.map((item, i) => (
            <li key={i}>
              <Component {...item} />
            </li>
          ))
        }
        </HeaderLevelContext.Provider>
      </ul>
    </section>
  )
}
