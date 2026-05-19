export const normalize = (str: string = '') =>
  str
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim()

// ================= LEVENSHTEIN =================

const levenshtein = (a: string, b: string) => {
  const matrix = Array.from({ length: b.length + 1 }, (_, i) => [i])

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1]
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1,
        )
      }
    }
  }

  return matrix[b.length][a.length]
}

// ================= FUZZY =================
export const fuzzyMatch = (text: string, keyword: string) => {
  const t = normalize(text)
  const k = normalize(keyword)

  if (!k) return true

  if (t.includes(k)) return true

  const textWords = t.split(' ')
  const keywordWords = k.split(' ')

  let matchedCount = 0

  for (const kw of keywordWords) {
    let matched = false

    for (const tw of textWords) {
      // contains
      if (tw.includes(kw) || kw.includes(tw)) {
        matched = true
        break
      }

      // typo
      const distance = levenshtein(tw, kw)

      if (distance <= 1 || distance / kw.length <= 0.3) {
        matched = true
        break
      }

      // subsequence
      let j = 0

      for (let i = 0; i < tw.length && j < kw.length; i++) {
        if (tw[i] === kw[j]) j++
      }

      if (j >= Math.max(2, kw.length - 1)) {
        matched = true
        break
      }
    }

    if (matched) {
      matchedCount++
    }
  }

  // ================= SCORE =================
  const score = matchedCount / keywordWords.length

  // cho phép miss vài từ
  return score >= 0.6
}
