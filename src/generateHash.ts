const generateHashCharacter = (
  hashString: string,
  randomNumber: number
): string => {
  return hashString[Math.floor(randomNumber * hashString.length)]
}

export const generateHash = (
  hashLength = 8,
  hashString = 'abcdefghijklmnopqrstuvwxyz0123456789'
): string => {
  return [...Array(hashLength)]
    .map(() => generateHashCharacter(hashString, Math.random()))
    .join('')
}
