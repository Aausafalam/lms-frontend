/**
 * Global error handling utilities
 * @description Centralized error handling for consistent error management
 */

/**
 * Format error message for user display
 * @param {Error|Object} error - Error object
 * @returns {string} Formatted error message
 */
export const formatErrorMessage = (error) => {
  if (typeof error === "string") return error

  if (error?.response?.data?.message) {
    return error.response.data.message
  }

  if (error?.message) {
    return error.message
  }

  return "An unexpected error occurred"
}

/**
 * Log error with context
 * @param {Error|Object} error - Error object
 * @param {string} context - Error context
 */
export const logError = (error, context = "") => {
  console.error(`[${context}]`, error)

  // In production, send to error tracking service
  if (process.env.NODE_ENV === "production") {
    // TODO: Integrate with error tracking service (Sentry, LogRocket, etc.)
  }
}

/**
 * Handle API errors consistently
 * @param {Error} error - API error
 * @param {string} operation - Operation that failed
 * @returns {Object} Standardized error response
 */
export const handleApiError = (error, operation = "operation") => {
  const message = formatErrorMessage(error)
  logError(error, operation)

  return {
    success: false,
    message,
    error: error,
  }
}
