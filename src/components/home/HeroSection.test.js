import { describe, it, expect, vi, beforeEach } from 'vitest'
import { shallowMount, flushPromises } from '@vue/test-utils'
import HeroSection from './HeroSection.vue'

// Mock API
const mockProfile = {
  name: 'John Doe',
  title: 'Software Engineer',
  tagline: 'Building great software',
  avatarFile: { url: '/files/avatar.jpg' },
  resumeFile: { url: '/files/resume.pdf' },
}

vi.mock('../../services/api', () => ({
  default: {
    getProfile: vi.fn(() => Promise.resolve({ data: mockProfile })),
  },
}))

// Mock error handler
vi.mock('../../composables/useErrorHandler', () => ({
  useErrorHandler: () => ({
    handleError: vi.fn(),
  }),
}))

// Mock crud helpers - minimal mock that sets loading state and delegates to service
vi.mock('../../utils/crudHelpers', () => ({
  createDataLoader: vi.fn(({ loading, data, service }) => {
    return async () => {
      const response = await service()
      data.value = response.data
      loading.value = false
    }
  }),
}))

// Mock file URL helper
vi.mock('../../utils/fileUrl', () => ({
  addSourceToFileUrl: vi.fn((url) => (url ? `${url}?source=test` : url)),
}))

describe('HeroSection', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Reset scrollIntoView mock - Element is a global in jsdom
    // eslint-disable-next-line no-undef
    Element.prototype.scrollIntoView = vi.fn()
  })

  const createWrapper = () =>
    shallowMount(HeroSection, {
      global: {
        stubs: {
          NSpace: true,
          NAvatar: true,
          NText: true,
          NButton: true,
          NIcon: true,
          NSpin: true,
          DownloadOutline: true,
          Transition: false,
        },
      },
    })

  describe('initial state', () => {
    it('renders component successfully', () => {
      const wrapper = createWrapper()
      expect(wrapper.exists()).toBe(true)
    })

    it('starts with loading state', () => {
      const wrapper = createWrapper()
      expect(wrapper.vm.loading).toBe(true)
    })

    it('starts with empty profile', () => {
      const wrapper = createWrapper()
      expect(wrapper.vm.profile).toEqual({})
    })
  })

  describe('data loading', () => {
    it('loads profile on mount', async () => {
      const wrapper = createWrapper()
      await flushPromises()

      expect(wrapper.vm.profile).toEqual(mockProfile)
    })

    it('sets loading to false after loading', async () => {
      const wrapper = createWrapper()
      await flushPromises()

      expect(wrapper.vm.loading).toBe(false)
    })
  })

  describe('profile display', () => {
    it('has profile-wrapper class', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('.profile-wrapper').exists()).toBe(true)
    })
  })

  describe('scrollTo', () => {
    it('scrolls to section when element exists', async () => {
      const wrapper = createWrapper()
      const mockElement = document.createElement('div')
      mockElement.id = 'skills'
      document.body.appendChild(mockElement)

      wrapper.vm.scrollTo('skills')

      expect(mockElement.scrollIntoView).toHaveBeenCalledWith({
        behavior: 'smooth',
        block: 'start',
      })

      document.body.removeChild(mockElement)
    })

    it('does nothing when element does not exist', () => {
      const wrapper = createWrapper()

      // Should not throw
      expect(() => wrapper.vm.scrollTo('nonexistent')).not.toThrow()
    })
  })
})
