import { createElement, createContext, useContext } from 'react'

export const HeaderLevelContext = createContext<{level:number}|null>(null)

export function Header({ title, subtitle, introduction }: HeaderProps & React.Attributes) {
  const context = useContext(HeaderLevelContext)
  if (!context)
    throw new Error('No level value was provided to HeaderLevelContext')
  const {level} = context

  return (
    <>
      <div className="title-container">
        {createElement(`h${level}`, null, title)}
        {
          subtitle && createElement(`h${level + 1}`, null, subtitle)
        }
      </div>
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
