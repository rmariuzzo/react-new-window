import React from 'react'
import { action } from '@storybook/addon-actions'
import NewWindow from '../src/NewWindow'

class BlockedStory extends React.PureComponent {

  state = {
    opened: false,
  }

  render() {
    const { opened } = this.state
    return (
      <div>
        <button onClick={ (event) => this.toggleOpened(event) }>
          { opened ? 'Close the opened window' : 'Open a new window' }
        </button>
        {}
        { opened &&
          <Delayed>
            <NewWindow onBlock={ () => this.newWindowBlocked() }>
              <h1>Hi 👋</h1>
            </NewWindow>
          </Delayed>
        }
      </div>
    )
  }

  toggleOpened() {
    setTimeout(() => {
      action(this.state.opened ? 'Closing the window' : 'Opening the window')()
      this.setState({ opened: !this.state.opened })
    }, 0)
  }

  newWindowBlocked() {
    action('Window blocked')()
    this.setState({ opened: false })
  }
}

class Delayed extends React.PureComponent {

  state = {
    show: false
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ show: true })
    }, 0)
  }

  render() {
    return ( this.state.show && this.props.children )
  }
}

export default BlockedStory
