import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import ResumeSection from '../ResumeSection.vue'

const mockGetExperience = vi.fn()
const mockGetCertifications = vi.fn()
vi.mock('../../../services/api', () => ({
  default: {
    getExperience: () => mockGetExperience(),
    getCertifications: () => mockGetCertifications(),
  },
}))

const mockHandleError = vi.fn()
vi.mock('../../../composables/useErrorHandler', () => ({
  useErrorHandler: () => ({
    handleError: mockHandleError,
  }),
}))

describe('ResumeSection.vue', () => {
  let wrapper
  
  const mockExperienceData = [
    {
      id: 1,
      position: 'Senior Developer',
      company: 'Tech Corp',
      startDate: '2022-01',
      endDate: '2024-01',
      isCurrent: false,
    },
  ]
  
  const mockCertificationsData = [
    {
      id: 1,
      name: 'AWS Solutions Architect',
      issuer: 'Amazon Web Services',
      issueDate: '2023-06-15',
      credentialUrl: 'https://aws.amazon.com/cert/123',
    },
  ]

  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount()
    }
  })

  describe('Removed Download Functionality', () => {
    it('should NOT display Download PDF button', async () => {
      mockGetExperience.mockResolvedValue({ data: [] })
      mockGetCertifications.mockResolvedValue({ data: [] })
      wrapper = mount(ResumeSection)
      
      await nextTick()
      await nextTick()
      
      const buttons = wrapper.findAll('.n-button')
      const downloadButton = buttons.find(btn => btn.text().includes('Download PDF'))
      
      expect(downloadButton).toBeUndefined()
    })

    it('should NOT have downloadResume method', async () => {
      mockGetExperience.mockResolvedValue({ data: [] })
      mockGetCertifications.mockResolvedValue({ data: [] })
      wrapper = mount(ResumeSection)
      
      await nextTick()
      
      expect(wrapper.vm.downloadResume).toBeUndefined()
    })
  })

  describe('Work Experience Section', () => {
    it('should load and display experience data', async () => {
      mockGetExperience.mockResolvedValue({ data: mockExperienceData })
      mockGetCertifications.mockResolvedValue({ data: [] })
      wrapper = mount(ResumeSection)
      
      await nextTick()
      await nextTick()
      
      expect(mockGetExperience).toHaveBeenCalledTimes(1)
      
      const timeline = wrapper.find('.n-timeline')
      expect(timeline.exists()).toBe(true)
    })

    it('should handle experience loading error', async () => {
      const mockError = new Error('Failed to load experience')
      mockGetExperience.mockRejectedValue(mockError)
      mockGetCertifications.mockResolvedValue({ data: [] })
      wrapper = mount(ResumeSection)
      
      await nextTick()
      await nextTick()
      
      expect(mockHandleError).toHaveBeenCalledWith(
        mockError,
        expect.objectContaining({
          retryFn: expect.any(Function),
        })
      )
    })
  })

  describe('Certifications Section', () => {
    it('should load and display certifications data', async () => {
      mockGetExperience.mockResolvedValue({ data: [] })
      mockGetCertifications.mockResolvedValue({ data: mockCertificationsData })
      wrapper = mount(ResumeSection)
      
      await nextTick()
      await nextTick()
      
      expect(mockGetCertifications).toHaveBeenCalledTimes(1)
      
      const grid = wrapper.find('.n-grid')
      expect(grid.exists()).toBe(true)
    })

    it('should display credential link when available', async () => {
      mockGetExperience.mockResolvedValue({ data: [] })
      mockGetCertifications.mockResolvedValue({ data: mockCertificationsData })
      wrapper = mount(ResumeSection)
      
      await nextTick()
      await nextTick()
      
      const links = wrapper.findAll('a.n-button')
      expect(links.length).toBeGreaterThan(0)
      
      const credentialLink = links.find(link => 
        link.attributes('href') === 'https://aws.amazon.com/cert/123'
      )
      expect(credentialLink).toBeDefined()
      expect(credentialLink.attributes('target')).toBe('_blank')
    })
  })
})