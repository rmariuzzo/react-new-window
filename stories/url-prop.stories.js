import React from 'react'
import { action } from '@storybook/addon-actions'
import NewWindow from '../src/NewWindow'
import Button from './components/Button'
import Container from './components/Container'
import TextInput from './components/TextInput'
import { storiesOf } from '@storybook/react';

const stories = storiesOf('react-new-window', module)

class UrlPropStory extends React.PureComponent {

  state = {
    opened: false,
    url: 'https://github.com/rmariuzzo',
  }

  componentDidMount() {
    $(() => Materialize.updateTextFields())
  }

  render() {
    const { opened, url } = this.state

    return (
      <Container>
        <h2>React New Window</h2>
        <h3>prop: url</h3>
        <TextInput
          label="URL"
          name="url"
          value={ url }
          onChange={ (event) => this.urlChanged(event.target.value) }
        />
        <Button onClick={ () => this.toggleOpened() }>
          { opened ? 'Close the opened window' : 'Open: ' + url }
        </Button>
        { opened &&
          <NewWindow
            url={ url }
            onUnload={ () => this.newWindowUnloaded() }
            features={ { left: 200, top: 200, width: 400, height: 400 } }
          />
        }
      </Container>
    )
  }

  toggleOpened() {
    action(this.state.opened ? 'Closing the window' : 'Opening the window')()
    this.setState((prevState) => ({
      opened: !prevState.opened
    }))
  }

  newWindowUnloaded() {
    action('Window unloaded')()
    this.setState({ opened: false })
  }

  urlChanged(url) {
    action('URL changed')()
    this.setState({ url })
  }
}

stories.add('Url prop', () => <UrlPropStory />)
