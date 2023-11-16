import { isUrl } from "./checks/stringRefinery"

export function hyperize<H>(text: string, hypermap: (index: number, text: string, url?: string) => H): H[] {
  const blocks = []
  let count = 0;

  const left = text.split('[')

  const first = left[count]
  if (first) {
    blocks.push(hypermap(count++, first, isUrl(first) ? first : undefined))
  }

  for (const lefty of left) {
    const middle = lefty.split('](')
    const text = middle[0]?.trim()

    if (text) {
      const right = middle[1]?.split(')')
      const url = right?.[0]

      if (url && isUrl(url)) {
        blocks.push(hypermap(count++, text, url))

        const remainder = right?.[1]
        if (remainder !== undefined) {
          blocks.push(hypermap(count++, remainder, isUrl(remainder) ? remainder : undefined))
        }

        continue
      }
    }

    if (isUrl(lefty)) {
      blocks.push(
        hypermap(count++, '('),
        hypermap(count++, lefty, lefty)
      )
    }
    else {
      blocks.push(hypermap(count++, `(${lefty}`))
    }
  }

  return blocks
}