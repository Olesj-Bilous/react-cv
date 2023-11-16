import { isUrl, isEmailAddress, isPhoneNumber } from "./checks/stringRefinery";

export function hyperize<H>(
  text: string,
  hypermap: (index: number, text: string, url?: string) => H,
  prefix = '//'
) { 
  return hyperizeBase(text, hypermap, (text: string) => tryLink(text, prefix))
}

export function tryLink(text: string, prefix = '//'): string | undefined {
  if (isEmailAddress(text)) {
    return `mailto:${text}`
  }
  if (isUrl(text)) { // url could be email address...
    return `${prefix}${text}`
  }
  if (isPhoneNumber(text)) {
    return `tel:${text}`
  }
}

export function hyperizeBase<H>(
  text: string,
  hypermap: (index: number, text: string, url?: string) => H,
  tryLink: (text: string) => string | undefined
): H[] {
  const blocks = []
  let count = 0;

  const left = text.split('[')

  const first = left[count]
  if (first) {
    blocks.push(hypermap(count++, first, tryLink(first)))
  }

  for (let i = 1; i < left.length; i++) {
    const lefty = left[i]!
    const middle = lefty.split('](')
    const text = middle[0]?.trim()

    if (text) {
      const right = middle[1]?.split(')')
      const urly = right?.[0]
      const url = urly && tryLink(urly)

      if (url) {
        blocks.push(hypermap(count++, text, url))

        const remainder = right?.[1]
        if (remainder !== undefined) {
          blocks.push(hypermap(count++, remainder, tryLink(remainder)))
        }

        continue
      }
    }

    const urly = tryLink(lefty)
    if (urly) {
      blocks.push(
        hypermap(count++, '['),
        hypermap(count++, lefty, urly)
      )
    }
    else {
      blocks.push(hypermap(count++, `[${lefty}`))
    }
  }

  return blocks
}