/**
 * Convert features props to window features format (name=value,other=value).
 */
export function toWindowFeatures(obj: Record<string, any>): string {
  return Object.keys(obj)
    .reduce<string[]>((features, name) => {
      const value = obj[name]
      if (typeof value === 'boolean') {
        features.push(`${name}=${value ? 'yes' : 'no'}`)
      } else {
        features.push(`${name}=${value}`)
      }
      return features
    }, [])
    .join(',')
}
