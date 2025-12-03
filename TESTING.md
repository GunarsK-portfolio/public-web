# Testing Guide

## Overview

The public-web uses Vitest with Vue Test Utils for unit testing Vue 3 components,
composables, and utility functions.

## Quick Commands

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run with coverage
npm run test:coverage

# Using task runner
task test
task test:watch
task test:coverage
```

## Test Files

5 test files, 77 tests

| File                      | Tests | Coverage                                        |
| ------------------------- | ----- | ----------------------------------------------- |
| `validation.test.js`      | 23    | required, email, url, minLength, validateForm   |
| `useErrorHandler.test.js` | 21    | handleError, handle404/403/500, retry mechanism |
| `useTheme.test.js`        | 16    | getStoredTheme, setStoredTheme, getThemeLabel   |
| `date.test.js`            | 10    | formatDate, formatDateRange                     |
| `BackToTop.test.js`       | 7     | scroll behavior, scrollToTop, lifecycle hooks   |

## Key Testing Patterns

### Mock Setup

Global test setup in `src/__tests__/setup.js`

```javascript
// localStorage mock
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
}
Object.defineProperty(window, 'localStorage', { value: localStorageMock })

// matchMedia mock for theme tests
Object.defineProperty(window, 'matchMedia', {
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    // ...
  })),
})

// Naive UI component stubs
config.global.stubs = {
  NInput: true,
  NButton: true,
  // ...
}
```

### Vue Component Testing

Mount with stubs

```javascript
const wrapper = mount(MyComponent, {
  props: { modelValue: 'test' },
  global: {
    stubs: { NInput: true, NIcon: true },
  },
})
```

### Composable Testing

Direct function calls with mocked dependencies

```javascript
localStorageMock.getItem.mockReturnValue('dark')
expect(getStoredTheme()).toBe('dark')
```

## Test Categories

### Utility Functions (`src/utils/`)

- Validation rules (required, email, url, minLength, validateForm, normalizeString)
- Date formatting and parsing

### Composables (`src/composables/`)

- `useTheme` - Theme detection, storage, and configuration
- `useErrorHandler` - Error handling, HTTP status codes, retry mechanism

### Components (`src/components/`)

- `BackToTop` - Scroll-to-top button with visibility toggle

## Test Structure

```text
src/
├── __tests__/
│   └── setup.js               # Global test setup
├── utils/
│   ├── validation.test.js
│   └── date.test.js
├── composables/
│   ├── useTheme.test.js
│   └── useErrorHandler.test.js
└── components/
    └── shared/
        └── BackToTop.test.js
```

## Contributing Tests

1. Follow naming: `<filename>.test.js` next to source file
2. Use descriptive `describe` and `it` blocks
3. Mock external dependencies (localStorage, matchMedia)
4. Test both success and error scenarios
5. Verify with: `npm test`
