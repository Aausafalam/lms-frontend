/**
 * Course form validation utilities
 * @description Reusable validation functions for course forms
 */

/**
 * Validates required fields
 * @param {Object} formData - Form data to validate
 * @returns {Object} Validation errors object
 */
export const validateRequiredFields = (formData) => {
  const errors = {}

  // Basic required fields
  if (!formData.name?.trim()) {
    errors.name = "Course name is required"
  }

  if (!formData.code?.trim()) {
    errors.code = "Course code is required"
  }

  if (!formData.summary?.trim()) {
    errors.summary = "Course summary is required"
  }

  if (!formData.duration || formData.duration < 1) {
    errors.duration = "Duration is required and must be at least 1 hour"
  }

  if (!formData.description?.trim()) {
    errors.description = "Description is required"
  }

  return errors
}

/**
 * Validates media fields
 * @param {Object} formData - Form data to validate
 * @returns {Object} Validation errors object
 */
export const validateMediaFields = (formData) => {
  const errors = {}

  if (!formData.id) {
    if (!formData.bannerImage?.fileId?.trim()) {
      errors.bannerImage = "Banner image is required"
    }

    if (!formData.thumbnailUrl?.fileId?.trim()) {
      errors.thumbnailUrl = "Thumbnail is required"
    }
  }

  return errors
}

/**
 * Validates array fields
 * @param {Object} formData - Form data to validate
 * @returns {Object} Validation errors object
 */
export const validateArrayFields = (formData) => {
  const errors = {}

  if (!Array.isArray(formData.difficultyLevel) || formData.difficultyLevel.length === 0) {
    errors.difficultyLevel = "At least one difficulty level is required"
  }

  if (!Array.isArray(formData.instructorIds) || formData.instructorIds.length === 0) {
    errors.instructorIds = "At least one instructor is required"
  }

  if (!Array.isArray(formData.categoryIds) || formData.categoryIds.length === 0) {
    errors.categoryIds = "At least one category is required"
  }

  return errors
}

/**
 * Validates features/skills
 * @param {Array} features - Features array to validate
 * @returns {string|null} Error message or null
 */
export const validateFeatures = (features) => {
  if (!Array.isArray(features)) return null

  const hasIncompleteFeature = features
    .filter((f) => f.name?.trim() || f.level?.trim())
    .some((f) => !f.name?.trim() || !f.level?.trim())

  return hasIncompleteFeature ? "Each skill must have both name and level" : null
}

/**
 * Validates attachments
 * @param {Array} attachments - Attachments array to validate
 * @returns {string|null} Error message or null
 */
export const validateAttachments = (attachments) => {
  if (!Array.isArray(attachments)) return null

  const hasIncompleteAttachment = attachments
    .filter((a) => a.title?.trim() || a.description?.trim() || a.file?.trim())
    .some((a) => !a.title?.trim() || !a.description?.trim() || !a.file?.trim())

  return hasIncompleteAttachment ? "Each attachment must have title, description, and file" : null
}

/**
 * Main validation function
 * @param {Object} formData - Complete form data to validate
 * @returns {Object} Combined validation errors
 */
export const validateCourseForm = (formData) => {
  const errors = {
    ...validateRequiredFields(formData),
    ...validateMediaFields(formData),
    ...validateArrayFields(formData),
  }

  // Validate features
  const featuresError = validateFeatures(formData.features)
  if (featuresError) {
    errors.features = featuresError
  }

  // Validate attachments
  const attachmentsError = validateAttachments(formData.attachments)
  if (attachmentsError) {
    errors.attachments = attachmentsError
  }

  return errors
}

/**
 * Checks if form has any validation errors
 * @param {Object} errors - Validation errors object
 * @returns {boolean} True if there are errors
 */
export const hasValidationErrors = (errors) => {
  return Object.keys(errors).length > 0
}
