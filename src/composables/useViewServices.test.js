import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useViewServices } from './useViewServices'

// Mock dependencies
const mockRouter = {
  push: vi.fn(),
  replace: vi.fn(),
}
const mockMessage = {
  success: vi.fn(),
  error: vi.fn(),
  warning: vi.fn(),
  info: vi.fn(),
}
const mockDialog = {
  warning: vi.fn(),
  error: vi.fn(),
  success: vi.fn(),
  info: vi.fn(),
}

vi.mock('vue-router', () => ({
  useRouter: () => mockRouter,
}))

vi.mock('naive-ui', () => ({
  useMessage: () => mockMessage,
  useDialog: () => mockDialog,
}))

describe('useViewServices', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns router instance', () => {
    const { router } = useViewServices()

    expect(router).toBe(mockRouter)
    expect(router.push).toBeDefined()
    expect(router.replace).toBeDefined()
  })

  it('returns message instance', () => {
    const { message } = useViewServices()

    expect(message).toBe(mockMessage)
    expect(message.success).toBeDefined()
    expect(message.error).toBeDefined()
    expect(message.warning).toBeDefined()
    expect(message.info).toBeDefined()
  })

  it('returns dialog instance', () => {
    const { dialog } = useViewServices()

    expect(dialog).toBe(mockDialog)
    expect(dialog.warning).toBeDefined()
    expect(dialog.error).toBeDefined()
  })

  it('allows navigation via router', () => {
    const { router } = useViewServices()

    router.push('/gallery')

    expect(mockRouter.push).toHaveBeenCalledWith('/gallery')
  })

  it('allows showing success message', () => {
    const { message } = useViewServices()

    message.success('Loaded successfully')

    expect(mockMessage.success).toHaveBeenCalledWith('Loaded successfully')
  })

  it('allows showing error message', () => {
    const { message } = useViewServices()

    message.error('Failed to load')

    expect(mockMessage.error).toHaveBeenCalledWith('Failed to load')
  })

  it('allows showing warning dialog', () => {
    const { dialog } = useViewServices()

    dialog.warning({ title: 'Confirm', content: 'Are you sure?' })

    expect(mockDialog.warning).toHaveBeenCalledWith({
      title: 'Confirm',
      content: 'Are you sure?',
    })
  })
})
