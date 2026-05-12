export function extractCategoryIds(category: any): string[] {
  if (!Array.isArray(category)) return []

  return category
    .map((c) => (typeof c === 'object' && c?.id ? String(c.id) : null))
    .filter((c): c is string => Boolean(c))
}
