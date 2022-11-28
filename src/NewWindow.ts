import React, { FC, PropsWithChildren, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

import { copyStyles } from './utils/copyStyles'
import { isNodeElement } from './utils/isNodeElement'
import { toWindowFeatures } from './utils/toWindowFeatures'

type NewWindowProps = PropsWithChildren<{
  url?: string
  name?: string
  title?: string
  features?: Record<string, any>
  center?: 'parent' | 'screen'
  copyStyles?: boolean
  closeOnUnmount?: boolean
  onOpen?: (window: Window) => void
  onUnload?: () => void
  onBlock?: () => void
}>

const defaultProps: Required<
  Omit<NewWindowProps, 'onOpen' | 'onUnload' | 'onBlock' | 'children'>
> = {
  url: '',
  name: '',
  title: '',
  features: { width: '600px', height: '640px' },
  center: 'parent',
  copyStyles: true,
  closeOnUnmount: true,
}

const NewWindow: FC<NewWindowProps> = (props) => {
  const {
    url = defaultProps.url,
    name = defaultProps.name,
    title = defaultProps.title,
    features = defaultProps.features,
    center = defaultProps.center,
    copyStyles = defaultProps.copyStyles,
    closeOnUnmount = defaultProps.closeOnUnmount,
    onOpen,
    onUnload,
    onBlock,
    children,
  } = props

  const [newWindow, setNewWindow] = useState<Window>()

  useEffect(function openNewWindow() {
    const opened = open({
      url,
      title,
      name,
      features,
      center,
      copyStyles,
      closeOnUnmount,
      onOpen,
      onUnload,
      onBlock,
    })

    if (opened) {
      setNewWindow(opened)
    }

    const windowCheckerInterval = setInterval(() => {
      if (!newWindow || newWindow.closed) {
        release()
      }
    }, 50)

    const release = () => {
      clearInterval(windowCheckerInterval)

      if (onUnload) {
        onUnload()
      }
    }

    // Release anything bound to this component before the new window unload.
    if (newWindow) {
      newWindow.addEventListener('beforeunload', () => release())
    }

    return () => {
      if (newWindow) {
        if (closeOnUnmount) {
          newWindow.close()
        } else if (props.children) {
          // TODO: Check this, this might cause new window to stop working as they become detached from the React tree.
          // Clone any children so they aren't removed when react stops rendering
          const container = getNewWindowContainerElement(newWindow)
          if (container) {
            const clone = container.cloneNode(true)
            if (isNodeElement(clone)) {
              clone.setAttribute('id', 'new-window-container-static')
              newWindow.document.body.appendChild(clone)
            }
          }
        }
      }
    }
  }, [])

  if (newWindow) {
    const container = getNewWindowContainerElement(newWindow)
    if (container) {
      return ReactDOM.createPortal(children, container)
    }
  }

  return null
}

const open = (props: NewWindowProps): Window | null => {
  const {
    url,
    title = defaultProps.title,
    name,
    features = defaultProps.features,
    onBlock,
    onOpen,
    center,
  } = props

  // Prepare position of the new window to be centered against the 'parent' window or 'screen'.
  if (
    typeof center === 'string' &&
    (features?.width === undefined || features?.height === undefined)
  ) {
    console.warn(
      'react-new-window: width and height window features must be present when a center prop is provided'
    )
  } else if (center === 'parent') {
    if (window.top === null) {
      console.warn(`react-new-window: can't access parent window`)
    } else {
      features.left =
        window.top.outerWidth / 2 + window.top.screenX - features.width / 2
      features.top =
        window.top.outerHeight / 2 + window.top.screenY - features.height / 2
    }
  } else if (center === 'screen') {
    const screenLeft =
      window.screenLeft !== undefined
        ? window.screenLeft
        : // @deprecated -- https://developer.mozilla.org/en-US/docs/Web/API/Screen/left
        'left' in window.screen
        ? (window.screen.left as number)
        : 0
    const screenTop =
      window.screenTop !== undefined
        ? window.screenTop
        : // @deprecated -- https://developer.mozilla.org/en-US/docs/Web/API/Screen/top
        'top' in window.screen
        ? (window.screen.top as number)
        : 0

    const width = window.innerWidth
      ? window.innerWidth
      : document.documentElement.clientWidth
      ? document.documentElement.clientWidth
      : window.screen.width
    const height = window.innerHeight
      ? window.innerHeight
      : document.documentElement.clientHeight
      ? document.documentElement.clientHeight
      : window.screen.height

    features.left = width / 2 - features.width / 2 + screenLeft
    features.top = height / 2 - features.height / 2 + screenTop
  }

  // Open a new window.
  const newWindow = window.open(url, name, toWindowFeatures(features))

  // Check if the new window was succesfully opened.
  if (newWindow) {
    newWindow.document.title = title

    // Check if the container already exists as the window may have been already open
    const hasContainer = !!getNewWindowContainerElement(newWindow)
    if (!hasContainer) {
      const container = newWindow.document.createElement('div')
      container.setAttribute('id', 'new-window-container')
      newWindow.document.body.appendChild(container)
    } else {
      // Remove any existing content
      const staticContainer = newWindow.document.getElementById(
        'new-window-container-static'
      )
      if (staticContainer) {
        newWindow.document.body.removeChild(staticContainer)
      }
    }

    // If specified, copy styles from parent window's document.
    if (props.copyStyles) {
      setTimeout(() => copyStyles(document, newWindow.document), 0)
    }

    if (onOpen) {
      onOpen(newWindow)
    }
  } else {
    // Handle error on opening of new window.
    if (onBlock) {
      onBlock()
    } else {
      console.warn(
        'react-new-window: A new window could not be opened. Maybe it was blocked.'
      )
    }
  }

  return newWindow
}

const getNewWindowContainerElement = (newWindow: Window): Element | null => {
  return newWindow.document.getElementById('new-window-container')
}

export default NewWindow
