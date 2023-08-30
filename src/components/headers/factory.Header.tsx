import { createElement, memo, FC } from 'react'
import { contextFactory } from '../../contexts/factory.Context'

export const [ HeaderLevelContext, useHeaderLevelContext ] = contextFactory<{ level: 1 | 2 | 3 | 4 }>('HeaderLevel', 'level')

export const Hn = memo(({ n, children }: {
  n: 1 | 2 | 3 | 4 | 5,
  children?: React.ReactNode
} & React.Attributes) => createElement(`h${n}`, null, children))

export function headerFactory<T extends {}, S extends {}, I extends {}, P extends {}, E extends {}>({
  Title, Subtitle, Introduction, Prelude, Epilogue
}:{
  Title: FC<T>,
  Subtitle: FC<S>,
  Introduction: FC<I>,
  Prelude?: FC<P>,
  Epilogue?: FC<E>
}) {
  return function Header({ title, subtitle, introduction, prelude, epilogue }: {
    title: T
    subtitle?: S
    introduction?: I
    prelude?: P
    epilogue?: E
  }) {
    const { level } = useHeaderLevelContext()

    return (
      <>
        <div className="head">
          {
            prelude && Prelude && <Prelude {...prelude} />
          }
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
          {
            epilogue && Epilogue && <Epilogue {...epilogue} />
          }
        </div>
        {
          introduction && (
            <p>
              <Introduction {...introduction} />
            </p>
          )
        }
      </>
    )
  }
}
