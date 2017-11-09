<div align=center>

# React New Window

Pop new windows in React, using `window.open`.

Inspired by [David Gilbertson's article](https://hackernoon.com/using-a-react-16-portal-to-do-something-cool-2a2d627b0202) (must read, must follow).

</div>

### Features

 - **Only 3.3KB** (that's 1.4 gzipped!).
 - **Support the full `window.open` api**.
 - **Built for React 16** (uses `ReactDOM.createPortal`).
 - **Handler for blocked popups** (via `onBlock` prop).
 - **Center popups** according to the parent window or screen.

## Installation

  - `npm install react-new-window --save`

    or 

  - `yarn add react-new-window`

## Usage

```js
import React from 'react'
import NewWindow from 'react-new-window'

const Demo = () => (
  <NewWindow>
    <h1>Hi 👋</h1>
  </NewWindow>
)
```

### Documentation

 | Properties | Type       | Default       | Description |
 | ---        | ---        | ---           | ---         |
 | `url`      | `String`   | ``            | The URL to open, if specified any `children` will be overriden ([more details on `url`](https://developer.mozilla.org/en-US/docs/Web/API/Window/open)). |
 | `name`     | `String`   | ``            | The name of the window ([more details on `windowName`](https://developer.mozilla.org/en-US/docs/Web/API/Window/open)). |
 | `title`    | `String`   | ``            | The title of the new window document. |
 | `features` | `Object`   | `{}`          | The set of window features ([more details on `windowFeatures`](https://developer.mozilla.org/en-US/docs/Web/API/Window/open#Window_features)). |
 | `onUnload` | `Function` | `undefined`   | A function to be triggered before the new window unload. |
 | `onBlock`  | `Function` | `undefined`   | A function to be triggered when the new window could not be opened. |
 | `center`   | `String`   | `parent`      | Indicate how to center the new window. Valid values are: `parent` or `screen`. `parent` will center the new window according to its _parent_ window. `screen` will center the new window according to the _screen_. |

---

 <div align=center>

Made with :hearth: by [Rubens Mariuzzo](https://github.com/rmariuzzo).

[MIT License](LICENSE)

 </div>
