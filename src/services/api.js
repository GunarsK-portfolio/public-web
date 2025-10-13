import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

if (!API_URL) {
  throw new Error('VITE_API_URL must be set in environment variables')
}

const api = axios.create({
  baseURL: API_URL,
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
  },
}
