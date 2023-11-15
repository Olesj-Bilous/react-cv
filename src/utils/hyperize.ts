import { isUrl } from "./checks/stringRefinery"

export function hyperize<H>(text: string, hypermap: (index: number, text: string, url?: string) => H): H[] {
  const left = text.split('(')
  const blocks = []
  if (left[0]) {
    blocks.push(hypermap(0, left[0], isUrl(left[0]) ? left[0] : undefined))
  }
  for (let i = 1; i < left.length; i++) {
    const middle = left[i]?.split(')[')
    if (middle) {
      const text = middle?.[0]?.trim()
      if (text) {
        const right = middle[1]?.split(']')
        if (right?.[0] !== undefined) {
          if (isUrl(right[0])) {
            blocks.push(hypermap(i, text, right[0]))
            if (right?.[1] !== undefined) {
              blocks.push(hypermap(i, right[1]))
            }
            continue
          }
        }
      }
    }
    if (left[i] !== undefined) {
      if (isUrl(left[i]!))
        blocks.push(hypermap(-i, '('), hypermap(i, left[i]!, left[i]))
      else
        blocks.push(hypermap(i, `(${left[i]}`))
    }
  }
  return blocks
}