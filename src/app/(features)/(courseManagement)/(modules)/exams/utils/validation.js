/**
 * Generic validation utilities
 * @description Reusable validation functions for forms and data
 */

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} Is valid email
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate required field
 * @param {any} value - Value to validate
 * @param {string} fieldName - Field name for error message
 * @returns {string|null} Error message or null
 */
export const validateRequired = (value, fieldName) => {
  if (!value || (typeof value === "string" && !value?.trim())) {
    return `${fieldName} is required`
  }
  return null
}

/**
 * Validate minimum length
 * @param {string} value - Value to validate
 * @param {number} minLength - Minimum length
 * @param {string} fieldName - Field name for error message
 * @returns {string|null} Error message or null
 */
export const validateMinLength = (value, minLength, fieldName) => {
  if (value && value.length < minLength) {
    return `${fieldName} must be at least ${minLength} characters`
  }
  return null
}

/**
 * Validate maximum length
 * @param {string} value - Value to validate
 * @param {number} maxLength - Maximum length
 * @param {string} fieldName - Field name for error message
 * @returns {string|null} Error message or null
 */
export const validateMaxLength = (value, maxLength, fieldName) => {
  if (value && value.length > maxLength) {
    return `${fieldName} must not exceed ${maxLength} characters`
  }
  return null
}

/**
 * Validate number range
 * @param {number} value - Value to validate
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @param {string} fieldName - Field name for error message
 * @returns {string|null} Error message or null
 */
export const validateNumberRange = (value, min, max, fieldName) => {
  const num = Number(value)
  if (isNaN(num)) {
    return `${fieldName} must be a valid number`
  }
  if (num < min) {
    return `${fieldName} must be at least ${min}`
  }
  if (max !== undefined && num > max) {
    return `${fieldName} must not exceed ${max}`
  }
  return null
}

/**
 * Validate array field
 * @param {Array} array - Array to validate
 * @param {number} minItems - Minimum number of items
 * @param {string} fieldName - Field name for error message
 * @returns {string|null} Error message or null
 */
export const validateArray = (array, minItems = 1, fieldName) => {
  if (!Array.isArray(array) || array.length < minItems) {
    return `${fieldName} must have at least ${minItems} item${minItems > 1 ? "s" : ""}`
  }
  return null
}

/**
 * Validate URL format
 * @param {string} url - URL to validate
 * @returns {boolean} Is valid URL
 */
export const isValidUrl = (url) => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * Combine multiple validation results
 * @param {Array} validationResults - Array of validation results
 * @returns {Object} Combined validation errors
 */
export const combineValidationResults = (validationResults) => {
  const errors = {}

  validationResults.forEach((result) => {
    if (result && typeof result === "object") {
      Object.assign(errors, result)
    }
  })

  return errors
}
