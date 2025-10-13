function validateEnv() {
  const required = {
    VITE_API_URL: import.meta.env.VITE_API_URL,
  }

  const missing = []
  for (const [key, value] of Object.entries(required)) {
    if (!value) {
      missing.push(key)
    }
  }

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables:\n${missing.map((key) => `  - ${key}`).join('\n')}`
    )
  }
}

validateEnv()

export const env = {
  apiUrl: import.meta.env.VITE_API_URL,
}
