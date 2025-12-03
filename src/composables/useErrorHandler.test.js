import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useErrorHandler } from './useErrorHandler'

// Mock dependencies
const mockPush = vi.fn()
const mockNotification = {
  error: vi.fn(),
  warning: vi.fn(),
  success: vi.fn(),
  info: vi.fn(),
}

vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: mockPush,
    currentRoute: { value: { fullPath: '/current' } },
  }),
}))

vi.mock('naive-ui', () => ({
  useNotification: () => mockNotification,
}))

vi.mock('../utils/logger', () => ({
  logger: {
    error: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
  },
}))

describe('useErrorHandler', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('handleError', () => {
    it('handles 404 errors by redirecting to NotFound page', () => {
      const { handleError } = useErrorHandler()
      const error = { response: { status: 404 } }

      handleError(error)

      expect(mockPush).toHaveBeenCalledWith({ name: 'NotFound' })
    })

    it('handles 403 errors by redirecting to Forbidden page', () => {
      const { handleError } = useErrorHandler()
      const error = { response: { status: 403 } }

      handleError(error)

      expect(mockPush).toHaveBeenCalledWith({ name: 'Forbidden' })
    })

    it('handles 401 errors with warning notification', () => {
      const { handleError } = useErrorHandler()
      const error = { response: { status: 401 } }

      handleError(error)

      expect(mockNotification.warning).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Authentication Required',
        })
      )
    })

    it('handles 500 errors with error notification', () => {
      const { handleError } = useErrorHandler()
      const error = { response: { status: 500, data: { message: 'Server broke' } } }

      handleError(error)

      expect(mockNotification.error).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Server Error',
          content: 'Server broke',
        })
      )
    })

    it('handles 502 errors as server errors', () => {
      const { handleError } = useErrorHandler()
      const error = { response: { status: 502 } }

      handleError(error)

      expect(mockNotification.error).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Server Error',
        })
      )
    })

    it('handles 503 errors as server errors', () => {
      const { handleError } = useErrorHandler()
      const error = { response: { status: 503 } }

      handleError(error)

      expect(mockNotification.error).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Server Error',
        })
      )
    })

    it('handles network errors without response', () => {
      const { handleError } = useErrorHandler()
      const error = { message: 'Network Error' }

      handleError(error)

      expect(mockNotification.error).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Network Error',
        })
      )
    })

    it('handles generic errors with custom message', () => {
      const { handleError } = useErrorHandler()
      const error = { response: { status: 418, data: { message: 'I am a teapot' } } }

      handleError(error)

      expect(mockNotification.error).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Error',
          content: 'I am a teapot',
        })
      )
    })
  })

  describe('handle404', () => {
    it('redirects to NotFound route', () => {
      const { handle404 } = useErrorHandler()

      handle404()

      expect(mockPush).toHaveBeenCalledWith({ name: 'NotFound' })
    })
  })

  describe('handle403', () => {
    it('redirects to Forbidden route', () => {
      const { handle403 } = useErrorHandler()

      handle403()

      expect(mockPush).toHaveBeenCalledWith({ name: 'Forbidden' })
    })
  })

  describe('handle500', () => {
    it('shows error notification with provided message', () => {
      const { handle500 } = useErrorHandler()

      handle500('Custom server error')

      expect(mockNotification.error).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Server Error',
          content: 'Custom server error',
        })
      )
    })

    it('shows default message when none provided', () => {
      const { handle500 } = useErrorHandler()

      handle500()

      expect(mockNotification.error).toHaveBeenCalledWith(
        expect.objectContaining({
          content: 'Something went wrong on our end. Please try again later.',
        })
      )
    })
  })

  describe('handleNetworkError', () => {
    it('shows notification when no retry function', () => {
      const { handleNetworkError } = useErrorHandler()

      handleNetworkError()

      expect(mockNotification.error).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Network Error',
        })
      )
    })

    it('triggers retry when retry function provided', () => {
      const { handleNetworkError } = useErrorHandler()
      const retryFn = vi.fn()

      handleNetworkError(retryFn, 'test-key')

      // First attempt uses setTimeout even with 0ms delay, so run all timers
      vi.runAllTimers()
      expect(retryFn).toHaveBeenCalled()
    })
  })

  describe('handleTimeout', () => {
    it('shows warning when no retry function', () => {
      const { handleTimeout } = useErrorHandler()

      handleTimeout()

      expect(mockNotification.warning).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Request Timeout',
        })
      )
    })
  })

  describe('showSuccess', () => {
    it('shows success notification', () => {
      const { showSuccess } = useErrorHandler()

      showSuccess('Success!', 'Operation completed')

      expect(mockNotification.success).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Success!',
          content: 'Operation completed',
        })
      )
    })

    it('uses default duration', () => {
      const { showSuccess } = useErrorHandler()

      showSuccess('Title', 'Content')

      expect(mockNotification.success).toHaveBeenCalledWith(
        expect.objectContaining({
          duration: 3000,
        })
      )
    })

    it('accepts custom duration', () => {
      const { showSuccess } = useErrorHandler()

      showSuccess('Title', 'Content', 5000)

      expect(mockNotification.success).toHaveBeenCalledWith(
        expect.objectContaining({
          duration: 5000,
        })
      )
    })
  })

  describe('showInfo', () => {
    it('shows info notification', () => {
      const { showInfo } = useErrorHandler()

      showInfo('Info', 'Something to know')

      expect(mockNotification.info).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Info',
          content: 'Something to know',
        })
      )
    })

    it('uses default duration of 4000', () => {
      const { showInfo } = useErrorHandler()

      showInfo('Title', 'Content')

      expect(mockNotification.info).toHaveBeenCalledWith(
        expect.objectContaining({
          duration: 4000,
        })
      )
    })
  })

  describe('retry mechanism', () => {
    it('schedules retry with delay', () => {
      const { handleNetworkError } = useErrorHandler()
      const retryFn = vi.fn()

      // First call schedules retry
      handleNetworkError(retryFn, 'test-key-1')

      // Before running timers, retryFn hasn't been called yet
      expect(retryFn).not.toHaveBeenCalled()

      // Run all timers to execute the scheduled retry
      vi.runAllTimers()
      expect(retryFn).toHaveBeenCalledTimes(1)
    })

    it('shows error after max retries are exhausted', () => {
      const { handleNetworkError } = useErrorHandler()
      const retryFn = vi.fn()
      const retryKey = 'max-retry-test'

      // Simulate 3 retries (MAX_RETRIES)
      handleNetworkError(retryFn, retryKey) // Attempt 1
      handleNetworkError(retryFn, retryKey) // Attempt 2
      handleNetworkError(retryFn, retryKey) // Attempt 3

      // 4th attempt should show error since max retries reached
      handleNetworkError(retryFn, retryKey)

      expect(mockNotification.error).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Network Error',
        })
      )
    })
  })
})
