import { logger } from './logger'

/**
 * Creates a data loader function with standard error handling and logging
 * Simplified version for public website (read-only operations)
 *
 * @param {Object} options - Configuration options
 * @param {import('vue').Ref} options.loading - Loading state ref
 * @param {import('vue').Ref} options.data - Data ref to populate
 * @param {Function} options.service - Service method to call
 * @param {string} options.entityName - Entity name for logging
 * @param {Function} options.handleError - Error handler function from useErrorHandler
 * @param {Function} [options.transform] - Optional data transformation function
 * @returns {Function} Async loader function
 *
 * @example
 * const loadProfile = createDataLoader({
 *   loading,
 *   data: profile,
 *   service: api.getProfile,
 *   entityName: 'profile',
 *   handleError,
 * })
 */
export function createDataLoader(options) {
  if (!options) {
    throw new Error('createDataLoader: options object is required')
  }

  const { loading, data, service, entityName, handleError, transform } = options

  if (!loading || !data || !service || !entityName || !handleError) {
    throw new Error(
      'createDataLoader: required options missing (loading, data, service, entityName, handleError)'
    )
  }

  const loader = async () => {
    loading.value = true
    try {
      const response = await service()
      const result = response.data

      // Apply transform with error handling
      if (transform) {
        try {
          data.value = transform(result)
        } catch (transformError) {
          logger.error(`Failed to transform ${entityName} data`, {
            error: transformError.message,
            stack: transformError.stack,
          })
          data.value = result // Fallback to untransformed data
        }
      } else {
        data.value = result
      }

      // Safely log count - check if data is array
      const count = Array.isArray(data.value) ? data.value.length : 'N/A'
      logger.info(`${entityName} loaded`, { count })
    } catch (error) {
      handleError(error, { retryFn: loader })
    } finally {
      loading.value = false
    }
  }

  return loader
}

/**
 * Creates a data loader for fetching a single item by ID
 *
 * @param {Object} options - Configuration options
 * @param {import('vue').Ref} options.loading - Loading state ref
 * @param {import('vue').Ref} options.data - Data ref to populate
 * @param {Function} options.service - Service method to call (receives id as parameter)
 * @param {string} options.entityName - Entity name for logging
 * @param {Function} options.handleError - Error handler function from useErrorHandler
 * @param {Function} options.getId - Function to get the ID (e.g., () => route.params.id)
 * @param {Function} [options.transform] - Optional data transformation function
 * @returns {Function} Async loader function
 *
 * @example
 * const loadProject = createItemLoader({
 *   loading,
 *   data: project,
 *   service: api.getProjectById,
 *   entityName: 'project',
 *   handleError,
 *   getId: () => route.params.id,
 * })
 */
export function createItemLoader(options) {
  if (!options) {
    throw new Error('createItemLoader: options object is required')
  }

  const { loading, data, service, entityName, handleError, getId, transform } = options

  if (!loading || !data || !service || !entityName || !handleError || !getId) {
    throw new Error(
      'createItemLoader: required options missing (loading, data, service, entityName, handleError, getId)'
    )
  }

  const loader = async () => {
    loading.value = true
    try {
      const id = getId()
      const response = await service(id)
      const result = response.data

      // Apply transform with error handling
      if (transform) {
        try {
          data.value = transform(result)
        } catch (transformError) {
          logger.error(`Failed to transform ${entityName} data`, {
            error: transformError.message,
            stack: transformError.stack,
          })
          data.value = result
        }
      } else {
        data.value = result
      }

      logger.info(`${entityName} loaded`, { id })
    } catch (error) {
      handleError(error, { retryFn: loader })
    } finally {
      loading.value = false
    }
  }

  return loader
}

/**
 * Creates a submit handler for one-time form submissions (e.g., contact forms)
 * Simplified version for public website (no edit mode, no modal)
 *
 * @param {Object} options - Configuration options
 * @param {import('vue').Ref} options.formRef - Form ref for validation
 * @param {import('vue').Ref} options.submitting - Submitting state ref
 * @param {import('vue').Ref} options.form - Form data ref
 * @param {Function} options.service - Service method to call
 * @param {string} options.entityName - Entity name for logging
 * @param {Function} options.message - Naive UI message instance
 * @param {Function} options.resetForm - Form reset function
 * @param {Function} options.validateForm - Form validation function
 * @param {string} [options.successMessage] - Custom success message
 * @param {string} [options.errorMessage] - Custom error message
 * @param {Function} [options.transformPayload] - Optional payload transformation
 * @param {Function} [options.onSuccess] - Optional callback after successful submit
 * @returns {Function} Async submit handler function
 *
 * @example
 * const handleSubmit = createSubmitHandler({
 *   formRef,
 *   submitting: sending,
 *   form: formData,
 *   service: contactApi.sendContactMessage,
 *   entityName: 'contact message',
 *   message,
 *   resetForm: handleReset,
 *   validateForm,
 *   successMessage: 'Message sent successfully!',
 * })
 */
export function createSubmitHandler(options) {
  if (!options) {
    throw new Error('createSubmitHandler: options object is required')
  }

  const {
    formRef,
    submitting,
    form,
    service,
    entityName,
    message,
    resetForm,
    validateForm,
    successMessage,
    errorMessage,
    transformPayload,
    onSuccess,
  } = options

  if (!submitting || !form || !service || !entityName || !message || !resetForm || !validateForm) {
    throw new Error(
      'createSubmitHandler: required options missing (submitting, form, service, entityName, message, resetForm, validateForm)'
    )
  }

  return async () => {
    if (formRef && !(await validateForm(formRef))) return

    submitting.value = true
    try {
      const payload = transformPayload ? transformPayload(form.value) : form.value
      await service(payload)

      logger.info(`${entityName} submitted successfully`)
      message.success(successMessage || `${entityName} sent successfully!`)
      resetForm()

      if (onSuccess) {
        try {
          await onSuccess()
        } catch (callbackError) {
          logger.error(`${entityName} success callback failed`, { error: callbackError.message })
        }
      }
    } catch (error) {
      logger.error(`Failed to submit ${entityName}`, {
        error: error.message,
        status: error.response?.status,
      })
      message.error(errorMessage || `Failed to send ${entityName}. Please try again.`)
    } finally {
      submitting.value = false
    }
  }
}
