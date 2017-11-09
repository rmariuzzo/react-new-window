import React from 'react'
import { storiesOf } from '@storybook/react'
import NewWindow from '../src/NewWindow'
import DefaultStory from './Default.story'
import BlockedStory from './Blocked.story'

storiesOf('React New Window', module)
  .add('example', () => <DefaultStory /> )
  .add(' - prop: url', () => <BlockedStory /> )
  .add(' - prop: title', () => <BlockedStory /> )
  .add(' - prop: features', () => <BlockedStory /> )
  .add(' - prop: onUnload', () => <BlockedStory /> )
  .add(' - prop: onBlock', () => <BlockedStory /> )
