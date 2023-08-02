import { useZustand } from '../../hooks/useZustand'
import { createElement, createContext, useContext, memo, FC } from 'react'
import { EditFullName } from '../edit/EditFullName'
import { EditText, EditTextToggle, EditTextarea, EditTextareaToggle } from '../edit/EditText'
import { contextFactory } from '../../contexts/contextFactory'

export const { Context: HeaderLevelContext, hook: useHeaderLevelContext } = contextFactory<{ level: 1 | 2 | 3 | 4 }>('HeaderLevel', 'level')

export const Hn = memo(({ n, children }: { n: 1 | 2 | 3 | 4 | 5, children?: React.ReactNode } & React.Attributes) => createElement(`h${n}`, null, children))

export function headerFactory<T extends {}, S extends {}, I extends {}>(
  Title: FC<T>,
  Subtitle: FC<S>,
  Introduction: FC<I>
) {
  return function Header({ title, subtitle, introduction }: {
    title: T
    subtitle?: S
    introduction?: I
  }) {
    const { level } = useHeaderLevelContext()

    return (
      <header>
        <div className="head">
          <div className="title">
            <Hn n={level}>
              
              <Title {...title} />
            </Hn>
            {
              subtitle && (
                <Hn n={level < 5 ? level + 1 as 2 | 3 | 4 | 5 : 5}>
                 { subtitle && <Subtitle {...subtitle} />}
                </Hn>
              )
            }
          </div>
        </div>
        {
          introduction && (
            <p>
              <Introduction {...introduction} />
            </p>
          )
        }
      </header>
    )
  }
}

export const Header = headerFactory(EditTextToggle, EditTextToggle, EditTextToggle)
