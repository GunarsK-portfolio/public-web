import { describe, it, expect, vi } from 'vitest'
import { required, email, url, minLength, validateForm, normalizeString } from './validation'

describe('validation utilities', () => {
  // ========================================
  // required
  // ========================================

  describe('required', () => {
    it('should return rule with correct field name', () => {
      const rule = required('Email')
      expect(rule.required).toBe(true)
      expect(rule.message).toBe('Email is required')
      expect(rule.trigger).toBe('blur')
    })

    it('should use custom trigger', () => {
      const rule = required('Name', 'change')
      expect(rule.trigger).toBe('change')
    })
  })

  // ========================================
  // email
  // ========================================

  describe('email', () => {
    it('should return rule with email pattern', () => {
      const rule = email()
      expect(rule.pattern).toBeInstanceOf(RegExp)
      expect(rule.message).toBe('Please enter a valid email address')
      expect(rule.trigger).toBe('blur')
    })

    it('should use custom trigger', () => {
      const rule = email('change')
      expect(rule.trigger).toBe('change')
    })

    it('should match valid emails', () => {
      const rule = email()
      expect(rule.pattern.test('user@example.com')).toBe(true)
      expect(rule.pattern.test('user.name@domain.org')).toBe(true)
      expect(rule.pattern.test('user+tag@sub.domain.co')).toBe(true)
    })

    it('should reject invalid emails', () => {
      const rule = email()
      expect(rule.pattern.test('invalid')).toBe(false)
      expect(rule.pattern.test('missing@domain')).toBe(false)
      expect(rule.pattern.test('@nodomain.com')).toBe(false)
    })
  })

  // ========================================
  // url
  // ========================================

  describe('url', () => {
    it('should return rule with validator function', () => {
      const rule = url()
      expect(rule.validator).toBeInstanceOf(Function)
      expect(rule.trigger).toBe('blur')
    })

    it('should accept empty values', () => {
      const rule = url()
      expect(rule.validator(null, '')).toBe(true)
      expect(rule.validator(null, null)).toBe(true)
      expect(rule.validator(null, '   ')).toBe(true)
    })

    it('should accept valid http/https URLs', () => {
      const rule = url()
      expect(rule.validator(null, 'https://example.com')).toBe(true)
      expect(rule.validator(null, 'http://example.com')).toBe(true)
      expect(rule.validator(null, 'https://example.com/path?query=1')).toBe(true)
    })

    it('should reject invalid URLs', () => {
      const rule = url()
      const result = rule.validator(null, 'not-a-url')
      expect(result).toBeInstanceOf(Error)
      expect(result.message).toBe('Please enter a valid URL')
    })

    it('should reject URLs with disallowed protocols', () => {
      const rule = url()
      const result = rule.validator(null, 'ftp://files.example.com')
      expect(result).toBeInstanceOf(Error)
      expect(result.message).toContain('URL must use one of the following')
    })

    it('should allow custom protocols', () => {
      const rule = url({ protocols: ['ftp:'] })
      expect(rule.validator(null, 'ftp://files.example.com')).toBe(true)
    })

    it('should use custom trigger', () => {
      const rule = url({ trigger: 'change' })
      expect(rule.trigger).toBe('change')
    })
  })

  // ========================================
  // minLength
  // ========================================

  describe('minLength', () => {
    it('should return rule with minimum length', () => {
      const rule = minLength(5)
      expect(rule.min).toBe(5)
      expect(rule.message).toBe('Must be at least 5 characters')
      expect(rule.trigger).toBe('blur')
    })

    it('should use custom trigger', () => {
      const rule = minLength(3, 'change')
      expect(rule.trigger).toBe('change')
    })
  })

  // ========================================
  // validateForm
  // ========================================

  describe('validateForm', () => {
    it('should return false if formRef is null', async () => {
      expect(await validateForm(null)).toBe(false)
    })

    it('should return false if formRef.value is null', async () => {
      expect(await validateForm({ value: null })).toBe(false)
    })

    it('should return true when validation passes', async () => {
      const formRef = {
        value: {
          validate: vi.fn().mockResolvedValue(undefined),
        },
      }
      expect(await validateForm(formRef)).toBe(true)
      expect(formRef.value.validate).toHaveBeenCalled()
    })

    it('should return false when validation fails', async () => {
      const formRef = {
        value: {
          validate: vi.fn().mockRejectedValue(new Error('Validation failed')),
        },
      }
      expect(await validateForm(formRef)).toBe(false)
    })
  })

  // ========================================
  // normalizeString
  // ========================================

  describe('normalizeString', () => {
    it('should convert string to lowercase', () => {
      expect(normalizeString('HELLO')).toBe('hello')
      expect(normalizeString('MiXeD')).toBe('mixed')
    })

    it('should handle null and undefined', () => {
      expect(normalizeString(null)).toBe('')
      expect(normalizeString(undefined)).toBe('')
    })

    it('should convert numbers to strings', () => {
      expect(normalizeString(123)).toBe('123')
      expect(normalizeString(0)).toBe('0')
    })

    it('should handle empty string', () => {
      expect(normalizeString('')).toBe('')
    })
  })
})
