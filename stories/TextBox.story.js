import React from 'react'
import { action } from '@storybook/addon-actions'
import NewWindow from '../src/NewWindow'
import Button from './components/Button'
import Container from './components/Container'

class TextBoxStory extends React.PureComponent {

  state = {
    opened: false,
    text: 'Hi',
  }

  onInput = (e) => {
    this.setState({text: e.target.value});
  }

  render() {
    const { opened, text } = this.state
    const now = new Date()
    return (
      <Container>
        <h2>React TextBox</h2>
        <h3>Example</h3>
        <p>
          Text: <code>{text}</code>
        </p>
        <Button onClick={ () => this.toggleOpened() }>
          { opened ? 'Close the opened window' : 'Open a new window' }
        </Button>
        { opened &&
          <NewWindow
            onUnload={ () => this.newWindowUnloaded() }
            features={ { left: 200, top: 200, width: 400, height: 400 } }
          >
            <h5>Here is a textbox. Type something in it and see it mirror to the parent.</h5>
            <input type="text" value={text} onChange={this.onInput} />
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

export default TextBoxStory
