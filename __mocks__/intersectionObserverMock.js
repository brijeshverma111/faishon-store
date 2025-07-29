// __mocks__/intersectionObserverMock.js

// Mock the IntersectionObserver constructor
class IntersectionObserver {
    constructor(callback, options) {
      this.callback = callback;
      this.options = options;
    }
  
    // Mock the observe method
    observe() {
      // For testing purposes, you might want to immediately call the callback
      // to simulate the element becoming visible, or control it in your tests.
      // For now, we'll just make it do nothing.
      // If you need to trigger it, you'd do it manually in your test:
      // observer.callback([{ isIntersecting: true, intersectionRatio: 1 }]);
    }
  
    // Mock the unobserve method
    unobserve() {}
  
    // Mock the disconnect method
    disconnect() {}
  }
  
  // Assign the mock to the global window object
  Object.defineProperty(window, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: IntersectionObserver,
  });
  