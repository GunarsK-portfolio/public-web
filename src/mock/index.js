// Mock API service that simulates API calls with local data
import profileData from './profile.json'
import experienceData from './experience.json'
import certificationsData from './certifications.json'
import miniaturesData from './miniatures.json'
import skillsData from './skills.json'
import projectsData from './projects.json'
import themesData from './themes.json'

// Simulate network delay for realistic behavior
const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms))

export const mockApi = {
  async getProfile() {
    await delay()
    return { data: profileData }
  },

  async getExperience() {
    await delay()
    return { data: experienceData }
  },

  async getCertifications() {
    await delay()
    return { data: certificationsData }
  },

  async getSkills() {
    await delay()
    return { data: skillsData }
  },

  async getProjects() {
    await delay()
    return { data: projectsData }
  },

  async getProjectById(id) {
    await delay()
    const project = projectsData.find((p) => p.id === parseInt(id))
    if (!project) {
      throw new Error(`Project with id ${id} not found`)
    }
    return { data: project }
  },

  async getMiniatureThemes() {
    await delay()
    return { data: themesData }
  },

  async getMiniatureThemeById(id) {
    await delay()
    const theme = themesData.find((t) => t.id === parseInt(id))
    if (!theme) {
      throw new Error(`Miniature theme with id ${id} not found`)
    }
    // Include miniatures belonging to this theme
    theme.miniatures = miniaturesData.filter((m) => m.themeId === theme.id)
    return { data: theme }
  },

  async getMiniatureById(id) {
    await delay()
    const miniature = miniaturesData.find((m) => m.id === parseInt(id))
    if (!miniature) {
      throw new Error(`Miniature with id ${id} not found`)
    }
    return { data: miniature }
  },
}

export default mockApi
