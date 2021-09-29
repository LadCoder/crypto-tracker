/**
 * Converts a camel case string/key into snake case.
 * @param {string} key The first number.
 * @return {string} The key in snake case.
 */
export function camelToSnake(key: string): string {
  const result = key.replace(/([A-Z])/g, ' $1')
  return result.split(' ').join('_').toLowerCase()
}
