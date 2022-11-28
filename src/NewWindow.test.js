import './__mocks__/window.open.mock'

import React from 'react'
import NewWindow from './NewWindow'
import { render, screen, within } from '@testing-library/react'

describe('NewWindow', () => {
  beforeEach(jest.clearAllMocks)

  it('should render', () => {
    expect(() => render(<NewWindow />)).not.toThrow()
  })

  it('should call `window.open` on render', () => {
    render(<NewWindow />)
    expect(window.open).toHaveBeenCalledTimes(1)
  })

  it('should render children contents on render', () => {
    const contents = 'this is a test contents'
    render(<NewWindow>{contents}</NewWindow>)
    expect(within(getNewWindow().document).getByText(contents))
  })
})

function getNewWindow() {
  return [...window.open.mock.results].pop().value
}