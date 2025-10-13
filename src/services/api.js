import axios from 'axios'
import { env } from '../config/env'

const api = axios.create({
  baseURL: env.apiUrl,
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
