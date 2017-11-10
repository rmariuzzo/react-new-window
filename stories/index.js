import React from 'react'
import { storiesOf } from '@storybook/react'
import NewWindow from '../src/NewWindow'
import DefaultStory from './Default.story'
import UrlPropStory from './UrlProp.story'
import TitlePropStory from './TitleProp.story'
import FeaturesPropStory from './FeaturesProp.story'

storiesOf('React New Window', module)
  .add('example', () => <DefaultStory /> )
  .add(' - prop: url', () => <UrlPropStory /> )
  .add(' - prop: title', () => <TitlePropStory /> )
  .add(' - prop: features', () => <FeaturesPropStory /> )
