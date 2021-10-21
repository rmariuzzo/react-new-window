import React from 'react'
import { action } from '@storybook/addon-actions'
import NewWindow from '../src/NewWindow'
import Button from './components/Button'
import Container from './components/Container'
import { storiesOf } from '@storybook/react'

const stories = storiesOf('react-new-window', module)

class CloseOnUnmountPropStories extends React.PureComponent {
  state = {
    opened: false,
    closeOnUnmount: true
  }

  componentDidMount() {
    $(() => Materialize.updateTextFields())
  }

  render() {
    const { opened, closeOnUnmount } = this.state

    return (
      <Container>
        <h2>React New Window</h2>
        <h3>prop: closeOnUnmount <Button onClick={() => this.toggleCloseOnUnmount()}>
          {closeOnUnmount ? 'true' : 'false'}
        </Button>
        </h3>

        <Button onClick={() => this.toggleOpened()}>
          {opened ? 'Unmount New Window' : 'Open a new window'}
        </Button>
        {opened && (
          <NewWindow
            title={'Window'}
            name={"closeOnUnmount-window"}
            onUnload={() => this.newWindowUnloaded()}
            features={{ left: 200, top: 200, width: 400, height: 400 }}
            closeOnUnmount={closeOnUnmount}
          >
            <h4>👋 Hi, once more!</h4>
            <p>{`This window will ${closeOnUnmount ? "close" : "remain open"} when New Window unmounts`}</p>
          </NewWindow>
        )}
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

  toggleCloseOnUnmount() {
    action(`Close on Unmount changed to ${!this.state.closeOnUnmount}`)()
    this.setState((prevState) => ({closeOnUnmount: !prevState.closeOnUnmount}))
  }
}

stories.add('Close on unmount prop', () => <CloseOnUnmountPropStories />)
