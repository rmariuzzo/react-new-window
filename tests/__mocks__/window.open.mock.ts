import { vi } from 'vitest'

Object.defineProperty(window, 'open', {
  writable: true,
  value: vi.fn().mockImplementation(() => ({
    document: document.implementation.createHTMLDocument(),
    addEventListener: vi.fn(),
    close: vi.fn(),
  })),
})
