import { createContext, useContext } from "react";


export function contextFactory<C>(descriptor: string, valueDescriptor?: string) {
  const Context = createContext<null | C>(null)
  const hook = () => {
    const value = useContext(Context)
    if (!value)
      throw new Error(`No ${valueDescriptor ? `${valueDescriptor} value` : 'value'} was provided to ${descriptor}Context`)
    return value
  }
  return [
    Context,
    hook
  ] as [context: React.Context<C>, hook: () => NonNullable<C> ]
}
