import { FC, Fragment, memo } from 'react'
import { editorFactory } from './factory.Editor'
import { entoggleValueEdit } from '../editable/entoggle'
import { isUrl } from '../../utils/checks/stringRefinery'
import { ContactText } from './EditContactText'

export const DisplayText = memo(({ display }: { display?: string }) => {
  if (!display) return <></>
  //const matches = display.matchAll(/((\([\w ]+\))(\[[\S]+\]))/g)

  const left = display.split('(')
  const blocks = [<ContactText key="0" display={left[0]!}/>]
  for (let i = 1; i < left.length; i++) {
    const middle = left[i]?.split(')[')
    if (middle) {
      const text = middle?.[0]?.trim()
      if (text) {
        const right = middle[1]?.split(']')
        if (right?.[1]) {
          if (isUrl(right[0]!)) {
            blocks.push(<Fragment key={i}><a href={right[0]}>{text}</a>{right[1]}</Fragment>)
            continue
          }
        }
      }
    }
    blocks.push(<Fragment key={i}>{left[i]}</Fragment>)
  }
  return <>{blocks}</>
})

export const EditText = memo(editorFactory({ element: 'input', type: 'text' }))

export const EditOptionalText = memo(decompulseEditor(EditText, () => '', acceptOptionalString))

export function decompulseEditor<T>(
  Editor: FC<{ state: HookedValue<T> }>,
  instantiate: () => T,
  accept: (value: T) => T | undefined
) {
  return function OptionalEditor({state:[value, set] }:{state: HookedValue<T | undefined>}) {
    const strictValue = value ?? instantiate()
    const strictSet = (value: T) => set(accept(value))
    return <Editor state={[strictValue, strictSet]} />
  }
}

export function acceptOptionalString(value: string) {
  return value.trim() === '' ? undefined : value
}

export const EditTextarea = memo(editorFactory({ element: 'textarea', props: { rows: 5 } }))

export const EditOptionalTextarea = memo(decompulseEditor(EditTextarea, () => '', acceptOptionalString))

export const EditTextToggle = memo(entoggleValueEdit({ Edit: EditText, Display: DisplayText }))

export const EditOptionalTextToggle = entoggleValueEdit({Edit: EditOptionalText, Display: DisplayText})

export const EditTextareaToggle = memo(entoggleValueEdit({ Edit: EditTextarea, Display: DisplayText }))

export const EditOptionalTextareaToggle = entoggleValueEdit({ Edit: EditOptionalTextarea, Display: DisplayText })
