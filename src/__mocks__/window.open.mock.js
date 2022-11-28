Object.defineProperty(window, 'open', {
  writable: true,
  value: jest.fn().mockImplementation((url, target, windowFeatures) => ({
    document: document.implementation.createHTMLDocument(),
    addEventListener: jest.fn(),
    close: jest.fn()
  }))
})