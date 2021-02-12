[![React New Window - Pop new windows in React, using window.open API.](.github/banner.svg)](#features)

> Inspired by [David Gilbertson's article](https://hackernoon.com/using-a-react-16-portal-to-do-something-cool-2a2d627b0202).

</div>

## Features

 - **Only 2.68KB** (gzipped!).
 - **Support the full `window.open` api**.
 - **Built for React 16** (uses `ReactDOM.createPortal`).
 - **Handler for blocked popups** (via `onBlock` prop).
 - **Center popups** according to the parent _window_ or _screen_.

## Installation

```sh
npm i react-new-window --save
```

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

When **`<NewWindow />`** is mounted a popup window will be opened. When unmounted then the popup will be closed.

The `children` contents is what will be rendered into the new popup window. In that case `Hi 👋` will be the content. The content can include any react-stateful code.

## Documentation

 | Properties | Type       | Default       | Description |
 | ---        | ---        | ---           | ---         |
 | `url`      | `String`   | ` `           | The URL to open, if specified any `children` will be overriden ([more details on `url`](https://developer.mozilla.org/en-US/docs/Web/API/Window/open)). |
 | `name`     | `String`   | ` `           | The name of the window ([more details on `windowName`](https://developer.mozilla.org/en-US/docs/Web/API/Window/open)). |
 | `title`    | `String`   | ` `           | The title of the new window document. |
 | `features` | `Object`   | `{}`          | The set of window features ([more details on `windowFeatures`](https://developer.mozilla.org/en-US/docs/Web/API/Window/open#Window_features)). |
 | `onUnload` | `Function` | `undefined`   | A function to be triggered before the new window unload. |
 | `onBlock`  | `Function` | `undefined`   | A function to be triggered when the new window could not be opened. |
 | `center`   | `String`   | `parent`      | Indicate how to center the new window. Valid values are: `parent` or `screen`. `parent` will center the new window according to its _parent_ window. `screen` will center the new window according to the _screen_. |
 | `copyStyles`  | `Boolean` | `true`   | If specified, copy styles from parent window's document. |

## Tests

Tests are manually done using Storybook. It can be run locally with: `yarn storybook`.

## Development

To start contributing to this project, please do:

 1. Fork and clone this repo.
 2. Do your work.
 3. Create a PR.

## Releases

```sh
npm version
```

### Prior work

 - [react-popout](https://github.com/JakeGinnivan/react-popout).

---

 <div align=center>

Made with :heart: by [Rubens Mariuzzo](https://github.com/rmariuzzo).

[MIT License](LICENSE)

 </div>
