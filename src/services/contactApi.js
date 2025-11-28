import axios from 'axios'
import { env } from '../config/env'
import { API_TIMEOUTS } from '../config/api'
import { mockMessageApi } from '../mock'

const messageApi = axios.create({
  baseURL: env.messageApiUrl,
  timeout: API_TIMEOUTS.DEFAULT,
})

export default env.useMockData
  ? mockMessageApi
  : {
      sendContactMessage(data) {
        return messageApi.post('/contact', data)
      },
    }
