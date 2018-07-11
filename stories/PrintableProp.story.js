import React from 'react'
import { action } from '@storybook/addon-actions'
import NewWindow from '../src/NewWindow'
import Button from './components/Button'
import Container from './components/Container'

class PrintablePropsStory extends React.PureComponent {

  state = {
    opened: false,
  }

  render() {
    const { opened } = this.state
    return (
      <Container>
        <h2>React New Window</h2>
        <h3>prop: isPrintable</h3>
        <Button onClick={ () => this.toggleOpened() }>
          { opened ? 'Close the opened window' : 'Open a new window to print' }
        </Button>
        { opened &&
          <NewWindow
            onUnload={ () => this.newWindowUnloaded() }
            features={ { left: 512, top: 100, width: 1024, height: 768 } }
            isPrintable={true}
          >
            <h2>Hi 👋</h2>
            <h4>This page will be printed</h4>
          </NewWindow>
        }
      </Container>
    )
  }

  toggleOpened() {
    action(this.state.opened ? 'Closing the window' : 'Opening the window')()
    this.setState(prevState => ({ opened: !prevState.opened }))
  }

  newWindowUnloaded() {
    action('Window unloaded')()
    this.setState({ opened: false })
  }
}

export default PrintablePropsStory
