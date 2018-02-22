import React from 'react'
import { action } from '@storybook/addon-actions'
import NewWindow from '../src/NewWindow'
import Button from './components/Button'
import Container from './components/Container'

class DefaultStory extends React.PureComponent {

  state = {
    opened: false,
    count: 0,
  };

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState(prevState => ({ count: prevState.count + 1 }));
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    const { opened, count } = this.state;
    return (
      <Container>
        <h2>React New Window</h2>
        <h3>Example</h3>
        <h4>Counting { count }...</h4>
        <Button onClick={ () => this.toggleOpened() }>
          { opened ? 'Close the opened window' : 'Open a new window' }
        </Button>
        { opened &&
          <NewWindow
            onUnload={ () => this.newWindowUnloaded() }
            features={ { left: 200, top: 200, width: 400, height: 400 } }
          >
            <h2>Hi 👋</h2>
            <h4>Counting here as well { count }...</h4>
            <Button>Keeping the same style as my parent</Button>
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
}

export default DefaultStory
