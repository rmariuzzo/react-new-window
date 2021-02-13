import React from 'react'
import { action } from '@storybook/addon-actions'
import NewWindow from '../src/NewWindow'
import Col from './components/Col'
import Row from './components/Row'
import Button from './components/Button'
import Container from './components/Container'
import TextInput from './components/TextInput'
import { storiesOf } from '@storybook/react'

const stories = storiesOf('react-new-window', module)

class FeaturesPropStory extends React.PureComponent {
  state = {
    opened: false,
    features: {
      width: 400,
      height: 150,
      left: 0,
      top: 0
    }
  }

  componentDidMount() {
    $(() => Materialize.updateTextFields())
  }

  render() {
    const { opened, features } = this.state

    return (
      <Container>
        <h2>React New Window</h2>
        <h3>prop: features</h3>
        <Row>
          <Col small={3}>
            <TextInput
              label="width="
              name="width"
              value={features.width}
              type="number"
              min="0"
              step="10"
              onChange={event => this.inputChanged(event)}
            />
          </Col>
          <Col small={3}>
            <TextInput
              label="height="
              name="height"
              value={features.height}
              type="number"
              min="0"
              step="10"
              onChange={event => this.inputChanged(event)}
            />
          </Col>
          <Col small={3}>
            <TextInput
              label="left="
              name="left"
              value={features.left}
              type="number"
              min="0"
              step="10"
              onChange={event => this.inputChanged(event)}
            />
          </Col>
          <Col small={3}>
            <TextInput
              label="top="
              name="top"
              value={features.top}
              type="number"
              min="0"
              step="10"
              onChange={event => this.inputChanged(event)}
            />
          </Col>
        </Row>

        <p>
          Any window features allowed for the <code>window.open</code> can be
          used.
          <br />
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/API/Window/open#Window_features"
            target="_blank"
          >
            View more details
          </a>
          .
        </p>

        <Button onClick={() => this.toggleOpened()}>
          {opened ? 'Close the opened window' : 'Open a new window'}
        </Button>
        {opened && (
          <NewWindow
            features={features}
            onUnload={() => this.newWindowUnloaded()}
          >
            <h4>👋 Hi, again!</h4>
          </NewWindow>
        )}
      </Container>
    )
  }

  toggleOpened() {
    action(this.state.opened ? 'Closing the window' : 'Opening the window')()
    this.setState(prevState => ({
      opened: !prevState.opened
    }))
  }

  newWindowUnloaded() {
    action('Window unloaded')()
    this.setState({ opened: false })
  }

  inputChanged(event) {
    action('Title changed')()
    const { target } = event
    this.setState({
      features: {
        ...this.state.features,
        [target.name]:
          target.type === 'checkbox' ? target.checked : target.value
      }
    })
  }
}

stories.add('Feature prop', () => <FeaturesPropStory />)
