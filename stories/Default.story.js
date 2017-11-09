import React from 'react'
import { action } from '@storybook/addon-actions'
import NewWindow from '../src/NewWindow'
import Button from './components/Button'
import Container from './components/Container'

class DefaultStory extends React.PureComponent {

  state = {
    opened: false,
    count: 0,
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({ count: this.state.count + 1 })
    }, 500)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    const { opened, count } = this.state
    const now = new Date()
    return (
      <Container>
        <h2>Counting { count }...</h2>
        <Button onClick={ () => this.toggleOpened() }>
          { opened ? 'Close the opened window' : 'Open a new window' }
        </Button>
        { opened &&
          <NewWindow
            onUnload={ () => this.newWindowUnloaded() }
            features={ { left: 200, top: 200, width: 400, height: 400 } }
          >
            <h1>Hi 👋</h1>
            <h2>Counting here as well { count }...</h2>
            <Button>Keeping the same style as my parent</Button>
          </NewWindow>
        }
      </Container>
    )
  }

  toggleOpened() {
    action(this.state.opened ? 'Closing the window' : 'Opening the window')()
    this.setState({ opened: !this.state.opened })
  }

  newWindowUnloaded() {
    action('Window unloaded')()
    this.setState({ opened: false })
  }
}

export default DefaultStory
