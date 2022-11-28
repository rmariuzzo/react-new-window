/**
 * Make keyframe rules.
 */
export function getKeyFrameText(cssRule: CSSKeyframesRule): string {
  const tokens = ['@keyframes', cssRule.name, '{']
  Array.from(cssRule.cssRules as any as CSSKeyframeRule[]).forEach(
    (cssRule) => {
      // type === CSSRule.KEYFRAME_RULE should always be true
      tokens.push(cssRule.keyText, '{', cssRule.style.cssText, '}')
    }
  )
  tokens.push('}')
  return tokens.join(' ')
}
