import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import HeroSection from '../HeroSection.vue'

// Mock the API module
const mockGetProfile = vi.fn()
vi.mock('../../../services/api', () => ({
  default: {
    getProfile: () => mockGetProfile(),
  },
}))

// Mock the error handler composable
const mockHandleError = vi.fn()
vi.mock('../../../composables/useErrorHandler', () => ({
  useErrorHandler: () => ({
    handleError: mockHandleError,
  }),
}))

describe('HeroSection.vue', () => {
  let wrapper

  const mockProfileData = {
    name: 'John Doe',
    title: 'Software Engineer',
    tagline: 'Building amazing web applications',
    avatarFile: {
      url: 'https://example.com/avatar.jpg',
    },
    resumeFile: {
      url: 'https://example.com/resume.pdf',
    },
  }

  beforeEach(() => {
    vi.clearAllMocks()
    window.HTMLElement.prototype.scrollIntoView = vi.fn()
  })

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount()
    }
  })

  describe('Profile Loading', () => {
    it('should display loading spinner initially', () => {
      mockGetProfile.mockImplementation(() => new Promise(() => {}))
      wrapper = mount(HeroSection)
      
      expect(wrapper.find('.n-spin').exists()).toBe(true)
      expect(wrapper.find('.profile-content').exists()).toBe(false)
    })

    it('should load and display profile data successfully', async () => {
      mockGetProfile.mockResolvedValue({ data: mockProfileData })
      wrapper = mount(HeroSection)
      
      await nextTick()
      await nextTick()
      
      expect(mockGetProfile).toHaveBeenCalledTimes(1)
      expect(wrapper.find('.profile-name').text()).toBe('John Doe')
      expect(wrapper.find('.profile-title').text()).toBe('Software Engineer')
      expect(wrapper.find('.profile-tagline').text()).toBe('Building amazing web applications')
    })

    it('should handle API errors and call error handler', async () => {
      const mockError = new Error('API Error')
      mockGetProfile.mockRejectedValue(mockError)
      wrapper = mount(HeroSection)
      
      await nextTick()
      await nextTick()
      
      expect(mockHandleError).toHaveBeenCalledWith(
        mockError,
        expect.objectContaining({
          retryFn: expect.any(Function),
        })
      )
    })

    it('should hide loading spinner after data loads', async () => {
      mockGetProfile.mockResolvedValue({ data: mockProfileData })
      wrapper = mount(HeroSection)
      
      await nextTick()
      await nextTick()
      
      expect(wrapper.find('.n-spin').exists()).toBe(false)
    })
  })

  describe('Avatar Rendering with Nested File Object', () => {
    it('should render avatar with avatarFile.url when available', async () => {
      mockGetProfile.mockResolvedValue({ data: mockProfileData })
      wrapper = mount(HeroSection)
      
      await nextTick()
      await nextTick()
      
      const avatar = wrapper.find('.n-avatar')
      expect(avatar.exists()).toBe(true)
      expect(avatar.attributes('src')).toBe('https://example.com/avatar.jpg')
    })

    it('should handle missing avatarFile gracefully', async () => {
      const profileWithoutAvatar = {
        ...mockProfileData,
        avatarFile: null,
      }
      mockGetProfile.mockResolvedValue({ data: profileWithoutAvatar })
      wrapper = mount(HeroSection)
      
      await nextTick()
      await nextTick()
      
      const avatar = wrapper.find('.n-avatar')
      expect(avatar.exists()).toBe(true)
      expect(avatar.attributes('fallback-src')).toBe('https://via.placeholder.com/150')
    })

    it('should handle missing avatarFile.url gracefully', async () => {
      const profileWithEmptyAvatar = {
        ...mockProfileData,
        avatarFile: {},
      }
      mockGetProfile.mockResolvedValue({ data: profileWithEmptyAvatar })
      wrapper = mount(HeroSection)
      
      await nextTick()
      await nextTick()
      
      const avatar = wrapper.find('.n-avatar')
      expect(avatar.exists()).toBe(true)
    })

    it('should handle undefined avatarFile property', async () => {
      const profileWithUndefinedAvatar = {
        name: 'John Doe',
        title: 'Software Engineer',
        tagline: 'Building amazing web applications',
      }
      mockGetProfile.mockResolvedValue({ data: profileWithUndefinedAvatar })
      wrapper = mount(HeroSection)
      
      await nextTick()
      await nextTick()
      
      const avatar = wrapper.find('.n-avatar')
      expect(avatar.exists()).toBe(true)
    })
  })

  describe('Download Resume Button', () => {
    it('should display download resume button when resumeFile.url is available', async () => {
      mockGetProfile.mockResolvedValue({ data: mockProfileData })
      wrapper = mount(HeroSection)
      
      await nextTick()
      await nextTick()
      
      const buttons = wrapper.findAll('.n-button')
      const downloadButton = buttons.find(btn => btn.text().includes('Download Resume'))
      
      expect(downloadButton).toBeDefined()
      expect(downloadButton.text()).toContain('Download Resume')
    })

    it('should have correct attributes for download resume button', async () => {
      mockGetProfile.mockResolvedValue({ data: mockProfileData })
      wrapper = mount(HeroSection)
      
      await nextTick()
      await nextTick()
      
      const buttons = wrapper.findAll('.n-button')
      const downloadButton = buttons.find(btn => btn.text().includes('Download Resume'))
      
      expect(downloadButton.attributes('href')).toBe('https://example.com/resume.pdf')
      expect(downloadButton.attributes('target')).toBe('_blank')
      expect(downloadButton.attributes('type')).toBe('primary')
    })

    it('should NOT display download button when resumeFile is null', async () => {
      const profileWithoutResume = {
        ...mockProfileData,
        resumeFile: null,
      }
      mockGetProfile.mockResolvedValue({ data: profileWithoutResume })
      wrapper = mount(HeroSection)
      
      await nextTick()
      await nextTick()
      
      const buttons = wrapper.findAll('.n-button')
      const downloadButton = buttons.find(btn => btn.text().includes('Download Resume'))
      
      expect(downloadButton).toBeUndefined()
    })

    it('should NOT display download button when resumeFile.url is missing', async () => {
      const profileWithEmptyResume = {
        ...mockProfileData,
        resumeFile: {},
      }
      mockGetProfile.mockResolvedValue({ data: profileWithEmptyResume })
      wrapper = mount(HeroSection)
      
      await nextTick()
      await nextTick()
      
      const buttons = wrapper.findAll('.n-button')
      const downloadButton = buttons.find(btn => btn.text().includes('Download Resume'))
      
      expect(downloadButton).toBeUndefined()
    })

    it('should NOT display download button when resumeFile is undefined', async () => {
      const profileWithoutResumeField = {
        name: 'John Doe',
        title: 'Software Engineer',
        tagline: 'Building amazing web applications',
      }
      mockGetProfile.mockResolvedValue({ data: profileWithoutResumeField })
      wrapper = mount(HeroSection)
      
      await nextTick()
      await nextTick()
      
      const buttons = wrapper.findAll('.n-button')
      const downloadButton = buttons.find(btn => btn.text().includes('Download Resume'))
      
      expect(downloadButton).toBeUndefined()
    })

    it('should display download icon in resume button', async () => {
      mockGetProfile.mockResolvedValue({ data: mockProfileData })
      wrapper = mount(HeroSection)
      
      await nextTick()
      await nextTick()
      
      const buttons = wrapper.findAll('.n-button')
      const downloadButton = buttons.find(btn => btn.text().includes('Download Resume'))
      
      expect(downloadButton.find('.n-icon').exists()).toBe(true)
    })
  })

  describe('Navigation Buttons', () => {
    it('should display "Experience" button instead of "Resume"', async () => {
      mockGetProfile.mockResolvedValue({ data: mockProfileData })
      wrapper = mount(HeroSection)
      
      await nextTick()
      await nextTick()
      
      const buttons = wrapper.findAll('.n-button')
      const experienceButton = buttons.find(btn => btn.text().trim() === 'Experience')
      const resumeButton = buttons.find(btn => btn.text().trim() === 'Resume')
      
      expect(experienceButton).toBeDefined()
      expect(resumeButton).toBeUndefined()
    })

    it('should display all navigation buttons', async () => {
      mockGetProfile.mockResolvedValue({ data: mockProfileData })
      wrapper = mount(HeroSection)
      
      await nextTick()
      await nextTick()
      
      const buttons = wrapper.findAll('.n-button')
      const buttonTexts = buttons.map(btn => btn.text().trim())
      
      expect(buttonTexts).toContain('Experience')
      expect(buttonTexts).toContain('Skills')
      expect(buttonTexts).toContain('Projects')
      expect(buttonTexts).toContain('Miniatures')
    })

    it('should scroll to resume section when Experience button clicked', async () => {
      mockGetProfile.mockResolvedValue({ data: mockProfileData })
      
      const mockElement = {
        scrollIntoView: vi.fn(),
      }
      document.getElementById = vi.fn(() => mockElement)
      
      wrapper = mount(HeroSection)
      
      await nextTick()
      await nextTick()
      
      const buttons = wrapper.findAll('.n-button')
      const experienceButton = buttons.find(btn => btn.text().trim() === 'Experience')
      
      await experienceButton.trigger('click')
      
      expect(document.getElementById).toHaveBeenCalledWith('resume')
      expect(mockElement.scrollIntoView).toHaveBeenCalledWith({
        behavior: 'smooth',
        block: 'start',
      })
    })

    it('should handle missing scroll target gracefully', async () => {
      mockGetProfile.mockResolvedValue({ data: mockProfileData })
      document.getElementById = vi.fn(() => null)
      
      wrapper = mount(HeroSection)
      
      await nextTick()
      await nextTick()
      
      const buttons = wrapper.findAll('.n-button')
      const experienceButton = buttons.find(btn => btn.text().trim() === 'Experience')
      
      expect(async () => {
        await experienceButton.trigger('click')
      }).not.toThrow()
    })
  })

  describe('Edge Cases and Error Handling', () => {
    it('should handle empty profile data', async () => {
      mockGetProfile.mockResolvedValue({ data: {} })
      wrapper = mount(HeroSection)
      
      await nextTick()
      await nextTick()
      
      expect(wrapper.find('.profile-name').text()).toBe('')
      expect(wrapper.find('.profile-title').text()).toBe('')
    })

    it('should handle null profile data', async () => {
      mockGetProfile.mockResolvedValue({ data: null })
      wrapper = mount(HeroSection)
      
      await nextTick()
      await nextTick()
      
      expect(wrapper.exists()).toBe(true)
    })

    it('should retry loading on error when retryFn is called', async () => {
      let callCount = 0
      mockGetProfile.mockImplementation(() => {
        callCount++
        if (callCount === 1) {
          return Promise.reject(new Error('Network Error'))
        }
        return Promise.resolve({ data: mockProfileData })
      })
      
      wrapper = mount(HeroSection)
      
      await nextTick()
      await nextTick()
      
      expect(mockHandleError).toHaveBeenCalled()
      const retryFn = mockHandleError.mock.calls[0][1].retryFn
      
      retryFn()
      
      await nextTick()
      await nextTick()
      
      expect(mockGetProfile).toHaveBeenCalledTimes(2)
    })
  })
})