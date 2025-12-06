import { describe, it, expect, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'

// Mock env config before importing component
vi.mock('../config/env', () => ({
  env: {
    apiUrl: 'http://localhost:8082',
    messageApiUrl: 'http://localhost:8086',
    useMockData: false,
  },
}))

import Home from './Home.vue'

describe('Home', () => {
  const createWrapper = () =>
    shallowMount(Home, {
      global: {
        stubs: {
          HeroSection: { template: '<div class="hero-section-stub" />' },
          ResumeSection: { template: '<div class="resume-section-stub" />' },
          SkillsSection: { template: '<div class="skills-section-stub" />' },
          ProjectsSection: { template: '<div class="projects-section-stub" />' },
          MiniaturesSection: { template: '<div class="miniatures-section-stub" />' },
          ContactSection: { template: '<div class="contact-section-stub" />' },
        },
      },
    })

  describe('structure', () => {
    it('renders component successfully', () => {
      const wrapper = createWrapper()
      expect(wrapper.exists()).toBe(true)
    })

    it('has home-page class', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('.home-page').exists()).toBe(true)
    })

    it('contains all home sections', () => {
      const wrapper = createWrapper()
      const sections = wrapper.findAll('.home-section')

      expect(sections.length).toBe(6)
    })
  })

  describe('section order', () => {
    it('renders sections in correct order', () => {
      const wrapper = createWrapper()
      const sections = wrapper.findAll('.home-section')

      expect(sections[0].find('.hero-section-stub').exists()).toBe(true)
      expect(sections[1].find('.resume-section-stub').exists()).toBe(true)
      expect(sections[2].find('.skills-section-stub').exists()).toBe(true)
      expect(sections[3].find('.projects-section-stub').exists()).toBe(true)
      expect(sections[4].find('.miniatures-section-stub').exists()).toBe(true)
      expect(sections[5].find('.contact-section-stub').exists()).toBe(true)
    })
  })

  describe('alternating backgrounds', () => {
    it('applies home-section-alt class to even sections', () => {
      const wrapper = createWrapper()
      const sections = wrapper.findAll('.home-section')

      // Index 1 (Resume), 3 (Projects), 5 (Contact) should have alt class
      expect(sections[1].classes()).toContain('home-section-alt')
      expect(sections[3].classes()).toContain('home-section-alt')
      expect(sections[5].classes()).toContain('home-section-alt')
    })

    it('does not apply home-section-alt to odd sections', () => {
      const wrapper = createWrapper()
      const sections = wrapper.findAll('.home-section')

      // Index 0 (Hero), 2 (Skills), 4 (Miniatures) should NOT have alt class
      expect(sections[0].classes()).not.toContain('home-section-alt')
      expect(sections[2].classes()).not.toContain('home-section-alt')
      expect(sections[4].classes()).not.toContain('home-section-alt')
    })
  })
})
