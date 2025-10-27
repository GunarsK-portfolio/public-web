# Component Tests

This directory contains unit tests for the home section components.

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode  
npm test -- --watch

# Run tests with coverage
npm test:coverage
```

## Test Files

- `HeroSection.spec.js` - Tests for the hero section component, including profile loading, avatar rendering with nested file objects, and the download resume button functionality
- `ResumeSection.spec.js` - Tests for the resume section component, verifying the removal of the download button and proper rendering of experience and certifications

## Testing Approach

These tests use:
- **Vitest** - Fast unit test framework
- **@vue/test-utils** - Official Vue.js testing utility library
- **happy-dom** - Lightweight DOM implementation for testing

All tests follow best practices with comprehensive coverage of happy paths and edge cases.