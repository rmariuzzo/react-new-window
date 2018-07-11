import React from 'react'
import { storiesOf } from '@storybook/react'
import NewWindow from '../src/NewWindow'
import DefaultStory from './Default.story'
import UrlPropStory from './UrlProp.story'
import TitlePropStory from './TitleProp.story'
import FeaturesPropStory from './FeaturesProp.story'
import TextBoxStory from './TextBox.story'
import PrintablePropsStory from "./PrintableProp.story"

storiesOf('React New Window', module)
  .add('example', () => <DefaultStory /> )
  .add(' - prop: url', () => <UrlPropStory /> )
  .add(' - prop: title', () => <TitlePropStory /> )
  .add(' - prop: features', () => <FeaturesPropStory /> )
  .add(' - prop: text box', () => <TextBoxStory /> )
  .add(' - prop: print mode', () => <PrintablePropsStory /> )
