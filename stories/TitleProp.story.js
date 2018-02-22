import React from 'react'
import { action } from '@storybook/addon-actions'
import NewWindow from '../src/NewWindow'
import Button from './components/Button'
import Container from './components/Container'
import TextInput from './components/TextInput'

class TitlePropStory extends React.PureComponent {

  state = {
    opened: false,
    title: 'Hello world!',
  };

  componentDidMount() {
    $(() => Materialize.updateTextFields())
  }

  render() {
    const { opened, title } = this.state;

    return (
      <Container>
        <h2>React New Window</h2>
        <h3>prop: title</h3>
        <TextInput
          label="Title"
          name="title"
          value={ title }
          onChange={ (event) => this.titleChanged(event.target.value) }
        />
        <Button onClick={ () => this.toggleOpened() }>
          { opened ? 'Close the opened window' : 'Open a new window' }
        </Button>
        { opened &&
          <NewWindow
            title={ title }
            onUnload={ () => this.newWindowUnloaded() }
            features={ { left: 200, top: 200, width: 400, height: 400 } }
          >
            <h4>Look over here 👆</h4>
            <h5>My title is { title }</h5>
            <p>
              <strong>Can't see it?</strong> That's how Safari is!
            </p>
          </NewWindow>
        }
      </Container>
    )
  }

  toggleOpened() {
    action(this.state.opened ? 'Closing the window' : 'Opening the window')();
    this.setState(prevState => ({ opened: !prevState.opened }));
  }

  newWindowUnloaded() {
    action('Window unloaded')();
    this.setState({ opened: false })
  }

  titleChanged(title) {
    action('Title changed')();
    this.setState({ title })
  }
}

export default TitlePropStory
