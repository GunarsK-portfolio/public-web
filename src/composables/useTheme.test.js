import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import {
  THEMES,
  getStoredTheme,
  setStoredTheme,
  getThemeLabel,
  createThemeConfig,
} from './useTheme'

describe('useTheme composable', () => {
  let localStorageMock
  let matchMediaMock

  beforeEach(() => {
    // Reset localStorage mock
    localStorageMock = {
      getItem: vi.fn(),
      setItem: vi.fn(),
    }
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true,
    })

    // Reset matchMedia mock
    matchMediaMock = vi.fn().mockReturnValue({
      matches: false,
    })
    Object.defineProperty(window, 'matchMedia', {
      value: matchMediaMock,
      writable: true,
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  // ========================================
  // THEMES constant
  // ========================================

  describe('THEMES', () => {
    it('should have light and dark themes', () => {
      expect(THEMES.LIGHT).toBe('light')
      expect(THEMES.DARK).toBe('dark')
    })
  })

  // ========================================
  // getStoredTheme
  // ========================================

  describe('getStoredTheme', () => {
    it('should return stored theme if valid', () => {
      localStorageMock.getItem.mockReturnValue('dark')
      expect(getStoredTheme()).toBe('dark')
      expect(localStorageMock.getItem).toHaveBeenCalledWith('theme')
    })

    it('should return stored light theme if valid', () => {
      localStorageMock.getItem.mockReturnValue('light')
      expect(getStoredTheme()).toBe('light')
    })

    it('should ignore invalid stored theme and check system preference', () => {
      localStorageMock.getItem.mockReturnValue('invalid-theme')
      matchMediaMock.mockReturnValue({ matches: true })
      expect(getStoredTheme()).toBe('dark')
    })

    it('should return dark if system prefers dark and no stored theme', () => {
      localStorageMock.getItem.mockReturnValue(null)
      matchMediaMock.mockReturnValue({ matches: true })
      expect(getStoredTheme()).toBe('dark')
      expect(matchMediaMock).toHaveBeenCalledWith('(prefers-color-scheme: dark)')
    })

    it('should return light as default when no preference', () => {
      localStorageMock.getItem.mockReturnValue(null)
      matchMediaMock.mockReturnValue({ matches: false })
      expect(getStoredTheme()).toBe('light')
    })
  })

  // ========================================
  // setStoredTheme
  // ========================================

  describe('setStoredTheme', () => {
    it('should store valid theme and return true', () => {
      expect(setStoredTheme('dark')).toBe(true)
      expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'dark')
    })

    it('should store light theme and return true', () => {
      expect(setStoredTheme('light')).toBe(true)
      expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'light')
    })

    it('should reject invalid theme and return false', () => {
      expect(setStoredTheme('invalid')).toBe(false)
      expect(localStorageMock.setItem).not.toHaveBeenCalled()
    })

    it('should reject empty string and return false', () => {
      expect(setStoredTheme('')).toBe(false)
      expect(localStorageMock.setItem).not.toHaveBeenCalled()
    })
  })

  // ========================================
  // getThemeLabel
  // ========================================

  describe('getThemeLabel', () => {
    it('should return "Light" for light theme', () => {
      expect(getThemeLabel('light')).toBe('Light')
    })

    it('should return "Dark" for dark theme', () => {
      expect(getThemeLabel('dark')).toBe('Dark')
    })

    it('should return "Unknown" for invalid theme', () => {
      expect(getThemeLabel('invalid')).toBe('Unknown')
      expect(getThemeLabel('')).toBe('Unknown')
      expect(getThemeLabel(null)).toBe('Unknown')
    })
  })

  // ========================================
  // createThemeConfig
  // ========================================

  describe('createThemeConfig', () => {
    it('should create config with light as null by default', () => {
      const config = createThemeConfig({})
      expect(config[THEMES.LIGHT]).toBe(null)
    })

    it('should merge provided theme map', () => {
      const darkTheme = { name: 'dark' }
      const config = createThemeConfig({ [THEMES.DARK]: darkTheme })
      expect(config[THEMES.LIGHT]).toBe(null)
      expect(config[THEMES.DARK]).toBe(darkTheme)
    })

    it('should allow overriding light theme', () => {
      const lightTheme = { name: 'custom-light' }
      const config = createThemeConfig({ [THEMES.LIGHT]: lightTheme })
      expect(config[THEMES.LIGHT]).toBe(lightTheme)
    })
  })
})
