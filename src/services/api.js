import axios from 'axios'
import { env } from '../config/env'
import { API_TIMEOUTS } from '../config/api'
import mockApi from '../mock'

const api = axios.create({
  baseURL: env.apiUrl,
  timeout: API_TIMEOUTS.DEFAULT,
})

// Export either mock API or real API based on configuration
export default env.useMockData
  ? mockApi
  : {
      getProfile() {
        return api.get('/profile')
      },
      getExperience() {
        return api.get('/experience')
      },
      getCertifications() {
        return api.get('/certifications')
      },
      getSkills() {
        return api.get('/skills')
      },
      getProjects() {
        return api.get('/projects')
      },
      getProjectById(id) {
        return api.get(`/projects/${id}`)
      },
      getMiniatureThemes() {
        return api.get('/miniatures/themes')
      },
      getMiniatureThemeById(id) {
        return api.get(`/miniatures/themes/${id}`)
      },
      getMiniatureById(id) {
        return api.get(`/miniatures/projects/${id}`)
      },
    }
