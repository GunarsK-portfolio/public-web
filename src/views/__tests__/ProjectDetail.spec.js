import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import ProjectDetail from '../ProjectDetail.vue'

const mockRoute = {
  params: { id: '1' },
}
const mockRouterBack = vi.fn()
vi.mock('vue-router', () => ({
  useRoute: () => mockRoute,
  useRouter: () => ({
    back: mockRouterBack,
  }),
}))

const mockGetProjectById = vi.fn()
vi.mock('../../services/api', () => ({
  default: {
    getProjectById: (id) => mockGetProjectById(id),
  },
}))

const mockHandleError = vi.fn()
vi.mock('../../composables/useErrorHandler', () => ({
  useErrorHandler: () => ({
    handleError: mockHandleError,
  }),
}))

vi.mock('../../constants/skills', () => ({
  getCategoryTagType: (category) => {
    const types = {
      Frontend: 'info',
      Backend: 'success',
      'DevOps & Tools': 'warning',
    }
    return types[category] || 'default'
  },
}))

describe('ProjectDetail.vue', () => {
  let wrapper

  const mockProjectData = {
    id: 1,
    title: 'Awesome Project',
    category: 'Web Development',
    description: 'A short description',
    longDescription: 'A detailed description of the project',
    imageFile: {
      url: 'https://example.com/project.jpg',
    },
    githubUrl: 'https://github.com/user/project',
    liveUrl: 'https://project.example.com',
    startDate: '2023-01-15',
    endDate: '2023-12-31',
    isOngoing: false,
    teamSize: 5,
    role: 'Lead Developer',
    technologies: [
      { skill: 'Vue.js', type: 'Frontend' },
      { skill: 'Node.js', type: 'Backend' },
    ],
    features: [
      'User authentication',
      'Real-time updates',
      'Responsive design',
    ],
    challenges: [
      'Scaling the database',
      'Optimizing performance',
    ],
    learnings: [
      'Learned about microservices',
      'Improved testing practices',
    ],
  }

  beforeEach(() => {
    vi.clearAllMocks()
    mockRoute.params.id = '1'
  })

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount()
    }
  })

  describe('Project Loading', () => {
    it('should display loading spinner initially', () => {
      mockGetProjectById.mockImplementation(() => new Promise(() => {}))
      wrapper = mount(ProjectDetail)
      
      expect(wrapper.find('.n-spin').exists()).toBe(true)
    })

    it('should load project data on mount with correct ID', async () => {
      mockGetProjectById.mockResolvedValue({ data: mockProjectData })
      wrapper = mount(ProjectDetail)
      
      await nextTick()
      await nextTick()
      
      expect(mockGetProjectById).toHaveBeenCalledWith('1')
      expect(mockGetProjectById).toHaveBeenCalledTimes(1)
    })

    it('should display project data after loading', async () => {
      mockGetProjectById.mockResolvedValue({ data: mockProjectData })
      wrapper = mount(ProjectDetail)
      
      await nextTick()
      await nextTick()
      
      expect(wrapper.text()).toContain('Awesome Project')
      expect(wrapper.text()).toContain('Web Development')
    })

    it('should handle API errors', async () => {
      const mockError = new Error('Failed to load project')
      mockGetProjectById.mockRejectedValue(mockError)
      wrapper = mount(ProjectDetail)
      
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

  describe('Project Image with Nested File Object', () => {
    it('should render image with imageFile.url when available', async () => {
      mockGetProjectById.mockResolvedValue({ data: mockProjectData })
      wrapper = mount(ProjectDetail)
      
      await nextTick()
      await nextTick()
      
      const image = wrapper.find('.n-image')
      expect(image.exists()).toBe(true)
      expect(image.attributes('src')).toBe('https://example.com/project.jpg')
      expect(image.attributes('alt')).toBe('Awesome Project')
    })

    it('should NOT render image when imageFile is null', async () => {
      const projectWithoutImage = {
        ...mockProjectData,
        imageFile: null,
      }
      mockGetProjectById.mockResolvedValue({ data: projectWithoutImage })
      wrapper = mount(ProjectDetail)
      
      await nextTick()
      await nextTick()
      
      const image = wrapper.find('.n-image')
      expect(image.exists()).toBe(false)
    })

    it('should NOT render image when imageFile.url is missing', async () => {
      const projectWithEmptyImage = {
        ...mockProjectData,
        imageFile: {},
      }
      mockGetProjectById.mockResolvedValue({ data: projectWithEmptyImage })
      wrapper = mount(ProjectDetail)
      
      await nextTick()
      await nextTick()
      
      const image = wrapper.find('.n-image')
      expect(image.exists()).toBe(false)
    })

    it('should NOT render image when imageFile is undefined', async () => {
      const projectWithoutImageField = {
        ...mockProjectData,
        imageFile: undefined,
      }
      mockGetProjectById.mockResolvedValue({ data: projectWithoutImageField })
      wrapper = mount(ProjectDetail)
      
      await nextTick()
      await nextTick()
      
      const image = wrapper.find('.n-image')
      expect(image.exists()).toBe(false)
    })

    it('should handle various image URL formats', async () => {
      const testCases = [
        'https://cdn.example.com/image.png',
        '/static/images/project.jpg',
        'https://s3.amazonaws.com/bucket/image.webp',
      ]

      for (const url of testCases) {
        const projectData = {
          ...mockProjectData,
          imageFile: { url },
        }
        mockGetProjectById.mockResolvedValue({ data: projectData })
        wrapper = mount(ProjectDetail)
        
        await nextTick()
        await nextTick()
        
        const image = wrapper.find('.n-image')
        expect(image.attributes('src')).toBe(url)
        
        wrapper.unmount()
      }
    })

    it('should have project-image class on image element', async () => {
      mockGetProjectById.mockResolvedValue({ data: mockProjectData })
      wrapper = mount(ProjectDetail)
      
      await nextTick()
      await nextTick()
      
      const image = wrapper.find('.project-image')
      expect(image.exists()).toBe(true)
    })
  })

  describe('Navigation', () => {
    it('should display back button', async () => {
      mockGetProjectById.mockResolvedValue({ data: mockProjectData })
      wrapper = mount(ProjectDetail)
      
      await nextTick()
      
      const backButton = wrapper.find('.n-button')
      expect(backButton.exists()).toBe(true)
      expect(backButton.text()).toContain('Back to Home')
    })

    it('should call router.back() when back button clicked', async () => {
      mockGetProjectById.mockResolvedValue({ data: mockProjectData })
      wrapper = mount(ProjectDetail)
      
      await nextTick()
      await nextTick()
      
      const backButton = wrapper.find('.n-button')
      await backButton.trigger('click')
      
      expect(mockRouterBack).toHaveBeenCalled()
    })
  })

  describe('Project Details Display', () => {
    it('should display project title and category', async () => {
      mockGetProjectById.mockResolvedValue({ data: mockProjectData })
      wrapper = mount(ProjectDetail)
      
      await nextTick()
      await nextTick()
      
      const pageHeader = wrapper.find('.n-page-header')
      expect(pageHeader.exists()).toBe(true)
      expect(pageHeader.attributes('title')).toBe('Awesome Project')
      expect(pageHeader.attributes('subtitle')).toBe('Web Development')
    })

    it('should display GitHub link when available', async () => {
      mockGetProjectById.mockResolvedValue({ data: mockProjectData })
      wrapper = mount(ProjectDetail)
      
      await nextTick()
      await nextTick()
      
      const links = wrapper.findAll('a.n-button')
      const githubLink = links.find(link => 
        link.attributes('href') === 'https://github.com/user/project'
      )
      
      expect(githubLink).toBeDefined()
      expect(githubLink.text()).toContain('View on GitHub')
      expect(githubLink.attributes('target')).toBe('_blank')
    })

    it('should NOT display GitHub link when not available', async () => {
      const projectWithoutGithub = {
        ...mockProjectData,
        githubUrl: null,
      }
      mockGetProjectById.mockResolvedValue({ data: projectWithoutGithub })
      wrapper = mount(ProjectDetail)
      
      await nextTick()
      await nextTick()
      
      const text = wrapper.text()
      expect(text).not.toContain('View on GitHub')
    })

    it('should display long description if available', async () => {
      mockGetProjectById.mockResolvedValue({ data: mockProjectData })
      wrapper = mount(ProjectDetail)
      
      await nextTick()
      await nextTick()
      
      const text = wrapper.text()
      expect(text).toContain('A detailed description of the project')
      expect(text).not.toContain('A short description')
    })
  })

  describe('Edge Cases', () => {
    it('should handle null project data', async () => {
      mockGetProjectById.mockResolvedValue({ data: null })
      wrapper = mount(ProjectDetail)
      
      await nextTick()
      await nextTick()
      
      expect(wrapper.exists()).toBe(true)
    })

    it('should handle different route parameter IDs', async () => {
      mockRoute.params.id = '42'
      mockGetProjectById.mockResolvedValue({ data: mockProjectData })
      wrapper = mount(ProjectDetail)
      
      await nextTick()
      
      expect(mockGetProjectById).toHaveBeenCalledWith('42')
    })

    it('should retry loading on error', async () => {
      let callCount = 0
      mockGetProjectById.mockImplementation(() => {
        callCount++
        if (callCount === 1) {
          return Promise.reject(new Error('Network Error'))
        }
        return Promise.resolve({ data: mockProjectData })
      })
      
      wrapper = mount(ProjectDetail)
      
      await nextTick()
      await nextTick()
      
      expect(mockHandleError).toHaveBeenCalled()
      const retryFn = mockHandleError.mock.calls[0][1].retryFn
      
      retryFn()
      
      await nextTick()
      await nextTick()
      
      expect(mockGetProjectById).toHaveBeenCalledTimes(2)
    })
  })
})