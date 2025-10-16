// Theme management composable
// Keeps theme logic separate from UI framework specifics

export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  // Future themes can be added here:
  // HIGH_CONTRAST: 'high-contrast',
  // COLORBLIND: 'colorblind',
}

export const getStoredTheme = () => {
  const savedTheme = localStorage.getItem('theme')

  // Validate saved theme
  if (savedTheme && Object.values(THEMES).includes(savedTheme)) {
    return savedTheme
  }

  // Check system preference
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return THEMES.DARK
  }

  return THEMES.LIGHT
}

export const setStoredTheme = (themeCode) => {
  if (Object.values(THEMES).includes(themeCode)) {
    localStorage.setItem('theme', themeCode)
    return true
  }
  return false
}

export const getThemeLabel = (themeCode) => {
  const labels = {
    [THEMES.LIGHT]: 'Light',
    [THEMES.DARK]: 'Dark',
    // Add labels for future themes
  }
  return labels[themeCode] || 'Unknown'
}

// Helper to create theme config for UI frameworks
// Usage: createThemeConfig({ [THEMES.DARK]: darkTheme })
export const createThemeConfig = (themeMap) => {
  return {
    [THEMES.LIGHT]: null, // Default to null for light theme
    ...themeMap,
  }
}
