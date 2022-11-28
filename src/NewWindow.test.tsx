import './__mocks__/window.open.mock'

import { vi } from 'vitest'
import React from 'react'
import NewWindow from './NewWindow'
import { render, waitFor, within } from '@testing-library/react'

describe('NewWindow', () => {
  beforeEach(vi.clearAllMocks)

  it('should render', () => {
    expect(() => render(<NewWindow />)).not.toThrow()
  })

  it('should call `window.open` on render', () => {
    render(<NewWindow />)
    expect(window.open).toHaveBeenCalledTimes(1)
  })

  it('should render children contents on render', async () => {
    const contents = 'this is a test contents'
    render(<NewWindow>{contents}</NewWindow>)
    await waitFor(() => {
      expect(within(getNewWindow().document).getByText(contents))
    })
  })
})

function getNewWindow() {
  return [...vi.mocked(window.open).mock.results].pop()?.value
}
