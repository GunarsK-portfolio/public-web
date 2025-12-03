import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { formatDate, formatDateRange } from './date'

describe('date utilities', () => {
  let consoleErrorSpy

  beforeEach(() => {
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    consoleErrorSpy.mockRestore()
  })

  // ========================================
  // formatDate
  // ========================================

  describe('formatDate', () => {
    it('should format ISO date to "Mon YYYY" format', () => {
      expect(formatDate('2015-08-01')).toBe('Aug 2015')
      expect(formatDate('2023-12-15')).toBe('Dec 2023')
      expect(formatDate('2020-01-01')).toBe('Jan 2020')
    })

    it('should handle full ISO datetime strings', () => {
      expect(formatDate('2015-08-15T10:30:00Z')).toBe('Aug 2015')
    })

    it('should return empty string for falsy values', () => {
      expect(formatDate('')).toBe('')
      expect(formatDate(null)).toBe('')
      expect(formatDate(undefined)).toBe('')
    })

    it('should return empty string for invalid dates', () => {
      expect(formatDate('invalid-date')).toBe('')
      expect(consoleErrorSpy).toHaveBeenCalledWith('Invalid date string: invalid-date')
    })

    it('should return empty string for malformed dates', () => {
      expect(formatDate('not-a-date')).toBe('')
      expect(consoleErrorSpy).toHaveBeenCalled()
    })
  })

  // ========================================
  // formatDateRange
  // ========================================

  describe('formatDateRange', () => {
    it('should format date range with both dates', () => {
      expect(formatDateRange('2015-08-01', '2020-06-01')).toBe('Aug 2015 - Jun 2020')
    })

    it('should show "Present" when isOngoing is true', () => {
      expect(formatDateRange('2015-08-01', null, true)).toBe('Aug 2015 - Present')
      expect(formatDateRange('2020-01-01', '2023-12-01', true)).toBe('Jan 2020 - Present')
    })

    it('should return empty string when startDate is missing', () => {
      expect(formatDateRange('', '2020-06-01')).toBe('')
      expect(formatDateRange(null, '2020-06-01')).toBe('')
      expect(consoleErrorSpy).toHaveBeenCalledWith('formatDateRange: startDate is required')
    })

    it('should return empty string when startDate is invalid', () => {
      expect(formatDateRange('invalid', '2020-06-01')).toBe('')
    })

    it('should handle missing endDate without isOngoing', () => {
      // When endDate is null and isOngoing is false, formatDate(null) returns ''
      expect(formatDateRange('2015-08-01', null, false)).toBe('Aug 2015 - ')
    })
  })
})
