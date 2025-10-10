import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8082'

const api = axios.create({
  baseURL: API_URL
})

export default {
  getProfile() {
    return api.get('/profile')
  },
  getExperience() {
    return api.get('/experience')
  },
  getCertifications() {
    return api.get('/certifications')
  },
  getMiniatures() {
    return api.get('/miniatures')
  },
  getMiniatureById(id) {
    return api.get(`/miniatures/${id}`)
  }
}
