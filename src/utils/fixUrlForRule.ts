/**
 * Handle local import urls.
 */
export function fixUrlForRule(cssRule: CSSRule): string {
  return cssRule.cssText
    .split('url(')
    .map((line) => {
      if (line[1] === '/') {
        return `${line.slice(0, 1)}${window.location.origin}${line.slice(1)}`
      }
      return line
    })
    .join('url(')
}
