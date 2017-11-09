'use strict'

/**
 * Component dependencies.
 * @private
 */

import React from 'react'
import ReactDOM from 'react-dom'

/**
 * The NewWindow class object.
 * @public
 */

class NewWindow extends React.PureComponent {

  /**
   * NewWindow default props.
   */
  static defaultProps = {
    url: '',
    name: '',
    title: '',
    features: {},
    onBlock: null,
    onUnload: null,
    center: 'parent'
  }

  /**
   * The NewWindow function constructor.
   * @param {Object} props
   */
  constructor(props) {
    super(props)
    this.container = document.createElement('div')
    this.window = null
  }

  /**
   * Render the NewWindow component.
   */
  render() {
    return ReactDOM.createPortal(this.props.children, this.container)
  }

  /**
   * Create the new window when NewWindow component mount.
   */
  componentDidMount() {
    const { url, title, name, features, onBlock, onUnload, center } = this.props

    // Prepare position of new window to appear center against the 'parent' window or 'screen'.
    if (typeof center === 'string' && (features.width === undefined || features.height === undefined)) {
      console.warn('left and top window features must be present when a center prop is provided')
    } else if (center === 'parent') {
      features.left = window.top.outerWidth / 2 + window.top.screenX - (features.width / 2)
      features.top = window.top.outerHeight / 2 + window.top.screenY - (features.height / 2)
    } else if (center === 'screen') {
      const screenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left;
      const screenTop = window.screenTop !== undefined ? window.screenTop : screen.top;

      const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
      const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

      features.left = ((width / 2) - (features.width / 2)) + screenLeft;
      features.top = ((height / 2) - (features.height / 2)) + screenTop;
    }

    // Open a new window.
    this.window = window.open(url, name, toWindowFeatures(features))

    // Check if the new window was succesfully opened.
    if (this.window) {
      this.window.document.title = title
      this.window.document.body.appendChild(this.container)

      copyStyles(document, this.window.document)

      this.window.addEventListener('beforeunload', () => {
        if (typeof onUnload === 'function') {
          onUnload.call(null)
        }
      })
    } else {

      // Handle error on opening of new window.
      if (typeof onBlock === 'function') {
        onBlock.call(null)
      } else {
        console.warn('A new window could not be opened. Maybe it was blocked.')
      }
    }
  }

  /**
   * Close the opened window (if any) when NewWindow will unmount.
   */
  componentWillUnmount() {
    if (this.window) {
      this.window.close()
    }
  }
}

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

function copyStyles(source, target) {
  Array.from(source.styleSheets).forEach(styleSheet => {

    // For <style> elements
    if (styleSheet.cssRules) {
      const newStyleEl = source.createElement('style')

      // Write the text of each rule into the body of the style element
      Array.from(styleSheet.cssRules).forEach(cssRule => {
        newStyleEl.appendChild(source.createTextNode(cssRule.cssText))
      })

      target.head.appendChild(newStyleEl)
    }

    // for <link> elements loading CSS from a URL
    else if (styleSheet.href) {
      const newLinkEl = source.createElement('link')

      newLinkEl.rel = 'stylesheet'
      newLinkEl.href = styleSheet.href
      target.head.appendChild(newLinkEl)
    }
  })
}

/**
 * Convert features props to window features format (name=value,other=value).
 * @param {Object} obj
 * @return {String}
 * @private
 */

function toWindowFeatures(obj) {
  return Object.keys(obj)
    .reduce((prev, curr) => {
      prev.push(`${curr}=${obj[curr]}`)
      return prev
    }, [])
    .join(',')
}

/**
 * Component export.
 * @private
 */

export default NewWindow
