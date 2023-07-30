import { useZustand } from '../hooks/useZustand'
import { createElement, createContext, useContext } from 'react'

export const HeaderLevelContext = createContext<{ level: number } | null>(null)

export const HeaderTypeContext = createContext<{ modelType: 'periods' | 'profiles' } | null>(null)

export function Header({ id, before, after, modelType }: Model & {
  before?: JSX.Element
  after?: JSX.Element
} & {
  modelType: 'periods' | 'profiles' | 'eras'
} & React.Attributes) {
  const levelContext = useContext(HeaderLevelContext)
  if (!levelContext)
    throw new Error('No level value was provided to HeaderLevelContext')
  const { level } = levelContext
  
  //const typeContext = useContext(HeaderTypeContext)
  //if (!typeContext)
  //  throw new Error('No type value was provided to HeaderTypeContext')
  //const { modelType } = typeContext

  const {title, subtitle, introduction} = useZustand(store => store.getHeaderProps(modelType, id))

  return (
    <>
      <header>
        <div className="title-container">
          {before}
          {
            createElement(`h${level}`, null, title)
          }
          {
            subtitle && createElement(`h${level + 1}`, null, subtitle)
          }
        </div>
        {after}
      </header>
      {
        introduction && (
          <div className="introduction">
            {introduction}
          </div>
        )
      }
    </>
  );
}
