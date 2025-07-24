// Jest setup file for TypeScript
import '@testing-library/jest-dom';

// Mock global Request for Next.js API route tests
if (typeof global.Request === 'undefined') {
  global.Request = class MockRequest {
    constructor(input: RequestInfo | URL, init?: RequestInit) {
      // Mock implementation
    }
  } as any;
}

// Mock global Response for Next.js API route tests
if (typeof global.Response === 'undefined') {
  global.Response = class MockResponse {
    constructor(body?: BodyInit | null, init?: ResponseInit) {
      // Mock implementation
    }
  } as any;
}

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toHaveTextContent(text: string | RegExp): R;
      toHaveNoViolations(): R;
      toBeDisabled(): R;
      toBeEnabled(): R;
      toHaveValue(value: string | number): R;
      toHaveDisplayValue(value: string | RegExp): R;
      toBeChecked(): R;
      toHaveAttribute(attr: string, value?: string): R;
      toHaveClass(className: string): R;
      toHaveStyle(style: string | object): R;
      toBeVisible(): R;
      toBeEmptyDOMElement(): R;
      toContainElement(element: HTMLElement | null): R;
      toContainHTML(html: string): R;
      toHaveDescription(description?: string | RegExp): R;
      toHaveErrorMessage(message?: string | RegExp): R;
      toHaveFocus(): R;
      toHaveFormValues(values: object): R;
      toHaveAccessibleDescription(description?: string | RegExp): R;
      toHaveAccessibleName(name?: string | RegExp): R;
      toBePartiallyChecked(): R;
      toBeRequired(): R;
      toBeValid(): R;
      toBeInvalid(): R;
    }
  }
}

// Mock Next.js headers
jest.mock('next/headers', () => ({
  cookies: () => ({
    get: jest.fn(),
    set: jest.fn(),
    delete: jest.fn(),
  }),
  headers: () => ({
    get: jest.fn(),
    has: jest.fn(),
    entries: jest.fn(),
    keys: jest.fn(),
    values: jest.fn(),
  })
}));

// Mock jsPDF to avoid canvas issues in test environment
jest.mock('jspdf', () => {
  return jest.fn().mockImplementation(() => ({
    internal: {
      pageSize: {
        width: 595.28,
        height: 841.89
      }
    },
    setFontSize: jest.fn(),
    setFont: jest.fn(),
    text: jest.fn(),
    save: jest.fn(),
    addPage: jest.fn(),
    getTextWidth: jest.fn(() => 100),
    splitTextToSize: jest.fn((text) => [text])
  }));
});

// Mock localStorage
const localStorageMock = (() => {
  let store: { [key: string]: string } = {};

  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    })
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});
