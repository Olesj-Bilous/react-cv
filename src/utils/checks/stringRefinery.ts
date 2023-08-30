export const isPhoneNumber = (value: string) =>
  /^(?:(?:(?:\+|00)[0-9]{2})|0)[0-9]{8,9}$/
    .test(clearWhitespace(value))

export const isEmailAddress = (value: string) =>
  /^[\w\-\.]{2,256}@[\w\-\.]{2,256}\.[a-z]{2,4}$/i
    .test(value)

export const isUrl = (value: string) =>
  /^(?:http(?:s)?:\/\/)?(?:www\.)?[\w.\-]{2,256}\.[a-z]{2,4}\/?[\w\-@:%+~#=?&]*$/i
    .test(value)

export const clearWhitespace = (value: string) => value.replaceAll(/\s/g, '')
