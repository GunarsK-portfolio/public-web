import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { nextTick } from 'vue'
import BackToTop from './BackToTop.vue'

describe('BackToTop', () => {
  let scrollY = 0
  let scrollToMock
  let matchMediaMock
  const originalScrollTo = window.scrollTo
  const originalScrollYDescriptor = Object.getOwnPropertyDescriptor(window, 'scrollY')

  const createScrollEvent = () => new window.Event('scroll')

  beforeEach(() => {
    scrollY = 0
    scrollToMock = vi.fn()
    matchMediaMock = vi.fn().mockReturnValue({ matches: false })

    Object.defineProperty(window, 'scrollY', {
      get: () => scrollY,
      configurable: true,
    })

    window.scrollTo = scrollToMock
    vi.stubGlobal('matchMedia', matchMediaMock)
  })

  afterEach(() => {
    vi.clearAllMocks()
    vi.unstubAllGlobals()
    window.scrollTo = originalScrollTo
    if (originalScrollYDescriptor) {
      Object.defineProperty(window, 'scrollY', originalScrollYDescriptor)
    }
  })

  const createWrapper = () =>
    shallowMount(BackToTop, {
      global: {
        stubs: {
          NButton: true,
          NIcon: true,
          ArrowUpOutline: true,
          Transition: true,
        },
      },
    })

  describe('initial state', () => {
    it('button is hidden by default', () => {
      const wrapper = createWrapper()
      expect(wrapper.vm.showButton).toBe(false)
    })
  })

  describe('scroll behavior', () => {
    it('shows button when scrollY > 300', async () => {
      const wrapper = createWrapper()

      scrollY = 350
      window.dispatchEvent(createScrollEvent())
      await nextTick()

      expect(wrapper.vm.showButton).toBe(true)
    })

    it('hides button when scrollY <= 300', async () => {
      const wrapper = createWrapper()

      scrollY = 400
      window.dispatchEvent(createScrollEvent())
      await nextTick()
      expect(wrapper.vm.showButton).toBe(true)

      scrollY = 100
      window.dispatchEvent(createScrollEvent())
      await nextTick()
      expect(wrapper.vm.showButton).toBe(false)
    })

    it('hides button at exactly 300px', async () => {
      const wrapper = createWrapper()

      scrollY = 300
      window.dispatchEvent(createScrollEvent())
      await nextTick()

      expect(wrapper.vm.showButton).toBe(false)
    })
  })

  describe('scrollToTop function', () => {
    it('scrolls to top with smooth behavior', () => {
      const wrapper = createWrapper()
      wrapper.vm.scrollToTop()

      expect(scrollToMock).toHaveBeenCalledWith({
        top: 0,
        behavior: 'smooth',
      })
    })

    it('uses auto behavior when user prefers reduced motion', () => {
      matchMediaMock.mockReturnValue({ matches: true })
      const wrapper = createWrapper()
      wrapper.vm.scrollToTop()

      expect(scrollToMock).toHaveBeenCalledWith({
        top: 0,
        behavior: 'auto',
      })
    })
  })

  describe('lifecycle', () => {
    it('adds scroll listener on mount', () => {
      const addEventListenerSpy = vi.spyOn(window, 'addEventListener')
      createWrapper()
      expect(addEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function))
    })

    it('removes scroll listener on unmount', () => {
      const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')
      const wrapper = createWrapper()
      wrapper.unmount()
      expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function))
    })
  })
})
