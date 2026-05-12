export const normalize = (str: string = '') =>
  str
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')

export const fuzzyMatch = (text: string, keyword: string) => {
  const t = normalize(text)
  const k = normalize(keyword)

  if (!k) return true
  if (t.includes(k)) return true

  let j = 0
  for (let i = 0; i < t.length && j < k.length; i++) {
    if (t[i] === k[j]) j++
  }

  return j === k.length
}
