import { Header, HeaderLevelContext } from "./Header";


export function SectionHeader({ id }: Model & React.Attributes) {
  return (
    <HeaderLevelContext.Provider value={{level: 3}}>
      <Header {...{ id, modelType: 'eras' }} />
    </HeaderLevelContext.Provider>
  )
}
