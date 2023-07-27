export const isPhoneNumber = (prop: string) => checker(prop.replaceAll(' ', ''),
  /^(?:(?:(?:\+|00)[0-9]{2})|0)[0-9]{8,9}$/
)

export const isEmailAddress = (prop: string) => checker(prop,
  /^[-\w.]+@[-\w]+\.[-\w]{2,4}$/i
)

export const isUrl = (prop: string) => checker(prop,
  /^(?:http(?:s)?:\/\/)?(?:www\.)?[a-zA-Z0-9@:%._\-+~#=]{2,256}\.[a-z]{2,6}\/?[/a-zA-Z0-9@:%_\-+~#=?&]*$/
)

const checker = (prop: string, rule: RegExp) => 0 < (prop.match(rule)?.length ?? 0)
