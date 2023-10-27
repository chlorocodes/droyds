/**
 * This was copied from discord.js@13.
 * This utility function was deprecated and removed in v14 since they wanted developers to do it themselves.
 */
export function splitMessage(
  text: string,
  { maxLength = 2_000, char = '\n', prepend = '', append = '' } = {}
) {
  text = verifyString(text)
  if (text.length <= maxLength) return [text]
  let splitText: Array<string> = [text]
  if (Array.isArray(char)) {
    while (
      char.length > 0 &&
      splitText.some((elem) => elem.length > maxLength)
    ) {
      const currentChar = char.shift()
      if (currentChar instanceof RegExp) {
        splitText = splitText.flatMap((chunk) =>
          chunk.match(currentChar)
        ) as string[]
      } else {
        splitText = splitText.flatMap((chunk) => chunk.split(currentChar))
      }
    }
  } else {
    splitText = text.split(char)
  }

  if (splitText.some((elem) => elem.length > maxLength))
    throw new RangeError('SPLIT_MAX_LEN')

  const messages = []
  let msg = ''
  for (const chunk of splitText) {
    if (msg && (msg + char + chunk + append).length > maxLength) {
      messages.push(msg + append)
      msg = prepend
    }
    msg += (msg && msg !== prepend ? char : '') + chunk
  }
  return messages.concat(msg).filter((m) => m)
}

function verifyString(
  data: string,
  error = Error,
  errorMessage = `Expected a string, got ${data} instead.`,
  allowEmpty = true
) {
  if (typeof data !== 'string') throw new error(errorMessage)
  if (!allowEmpty && data.length === 0) throw new error(errorMessage)
  return data
}
