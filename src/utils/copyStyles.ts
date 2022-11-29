import { fixUrlForRule } from './fixUrlForRule'
import { getKeyFrameText } from './getKeyFrameText'

/**
 * Utility functions.
 * @private
 */
/**
 * Copy styles from a source document to a target.
 * @param {Object} source
 * @param {Object} target
 * @private
 */
export function copyStyles(source: Document, target: Document) {
  // Store style tags, avoid reflow in the loop
  const headFrag = target.createDocumentFragment()

  Array.from(source.styleSheets).forEach((styleSheet) => {
    // For <style> elements
    let rules
    try {
      rules = styleSheet.cssRules
    } catch (err) {
      console.error(err)
    }

    // For @font-face rule, it must be loaded via <link href=''> because the
    // rule contains relative path from the css file.
    const isFontFaceRule =
      rules &&
      Object.values(rules).some((r) => r instanceof CSSFontFaceRule) &&
      styleSheet.href

    if (rules && !isFontFaceRule) {
      // IE11 is very slow for appendChild, so use plain string here
      const ruleText: string[] = []

      // Write the text of each rule into the body of the style element
      Array.from(styleSheet.cssRules).forEach((cssRule) => {
        const { type } = cssRule

        // Skip unknown rules
        // 0 =  CSSRule.UNKNOWN_RULE -- https://developer.mozilla.org/en-US/docs/Web/API/CSSRule/type
        if (type === 0) {
          return
        }

        let returnText = ''

        if (type === CSSRule.KEYFRAMES_RULE) {
          // IE11 will throw error when trying to access cssText property, so we
          // need to assemble them
          returnText = getKeyFrameText(cssRule as CSSKeyframesRule)
        } else if (
          [CSSRule.IMPORT_RULE, CSSRule.FONT_FACE_RULE].includes(type)
        ) {
          // Check if the cssRule type is CSSImportRule (3) or CSSFontFaceRule (5)
          // to handle local imports on a about:blank page
          // '/custom.css' turns to 'http://my-site.com/custom.css'
          returnText = fixUrlForRule(cssRule)
        } else {
          returnText = cssRule.cssText
        }
        ruleText.push(returnText)
      })

      const newStyleEl = target.createElement('style')
      newStyleEl.textContent = ruleText.join('\n')
      headFrag.appendChild(newStyleEl)
    } else if (styleSheet.href) {
      // for <link> elements loading CSS from a URL
      const newLinkEl = target.createElement('link')

      newLinkEl.rel = 'stylesheet'
      newLinkEl.href = styleSheet.href
      headFrag.appendChild(newLinkEl)
    }
  })

  target.head.appendChild(headFrag)
}
