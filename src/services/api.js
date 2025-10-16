import axios from 'axios'
import { env } from '../config/env'
import mockApi from '../mock'

const api = axios.create({
  baseURL: env.apiUrl,
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
      getMiniatures() {
        return api.get('/miniatures')
      },
      getMiniatureById(id) {
        return api.get(`/miniatures/${id}`)
      },
      getMiniatureThemes() {
        return api.get('/miniatures/themes')
      },
    }
