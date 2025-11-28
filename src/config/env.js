function validateEnv() {
  // Skip validation if using mock data
  const useMockData = import.meta.env.VITE_USE_MOCK_DATA === 'true'
  if (useMockData) {
    return
  }

  const required = {
    VITE_API_URL: import.meta.env.VITE_API_URL,
    VITE_MESSAGE_API_URL: import.meta.env.VITE_MESSAGE_API_URL,
  }

  const missing = []
  for (const [key, value] of Object.entries(required)) {
    if (!value) {
      missing.push(key)
    }
  }

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables:\n${missing.map((key) => `  - ${key}`).join('\n')}\n\nTip: Set VITE_USE_MOCK_DATA=true to use mock data instead.`
    )
  }
}

validateEnv()

export const env = {
  apiUrl: import.meta.env.VITE_API_URL,
  messageApiUrl: import.meta.env.VITE_MESSAGE_API_URL,
  useMockData: import.meta.env.VITE_USE_MOCK_DATA === 'true',
}
