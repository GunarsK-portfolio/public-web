/**
 * Creates required field validation rule
 * @param {string} fieldName - Field name for error message
 * @param {string} trigger - Validation trigger event
 * @returns {Object} Naive UI validation rule
 */
export const required = (fieldName, trigger = 'blur') => ({
  required: true,
  message: `${fieldName} is required`,
  trigger,
})

/**
 * Creates email validation rule
 * More comprehensive regex that prevents common invalid patterns
 * @param {string} trigger - Validation trigger event
 * @returns {Object} Naive UI validation rule
 */
export const email = (trigger = 'blur') => ({
  pattern: /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  message: 'Please enter a valid email address',
  trigger,
})

/**
 * Creates URL validation rule with protocol restrictions
 * @param {Object} options - Validation options
 * @param {Array<string>} options.protocols - Allowed protocols (default: ['http:', 'https:'])
 * @param {string} options.trigger - Validation trigger event
 * @returns {Object} Naive UI validation rule
 */
export const url = (options = {}) => {
  const { protocols = ['http:', 'https:'], trigger = 'blur' } = options

  return {
    validator: (_rule, value) => {
      if (!value) return true
      try {
        const urlObj = new URL(value)
        if (!protocols.includes(urlObj.protocol)) {
          return new Error(`URL must use one of the following protocols: ${protocols.join(', ')}`)
        }
        return true
      } catch {
        return new Error('Please enter a valid URL')
      }
    },
    trigger,
  }
}

/**
 * Creates minimum length validation rule
 * @param {number} min - Minimum length
 * @param {string} trigger - Validation trigger event
 * @returns {Object} Naive UI validation rule
 */
export const minLength = (min, trigger = 'blur') => ({
  min,
  message: `Must be at least ${min} characters`,
  trigger,
})

/**
 * Validates form and returns true if valid, false if invalid
 * @param {Object} formRef - Naive UI form ref
 * @returns {Promise<boolean>} True if validation passes
 */
export async function validateForm(formRef) {
  if (!formRef?.value) return false
  try {
    await formRef.value.validate()
    return true
  } catch {
    return false
  }
}

/**
 * Normalizes a value to a safe string for search/filter operations
 * Converts null/undefined to empty string and ensures lowercase
 * @param {any} value - Value to normalize
 * @returns {string} Normalized lowercase string
 */
export function normalizeString(value) {
  return (value ?? '').toString().toLowerCase()
}
