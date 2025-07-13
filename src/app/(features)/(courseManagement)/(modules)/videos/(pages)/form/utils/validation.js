/**
 * Video form validation utilities
 * @description Reusable validation functions for video forms
 */

/**
 * Validates required fields
 * @param {Object} formData - Form data to validate
 * @returns {Object} Validation errors object
 */
export const validateRequiredFields = (formData) => {
    const errors = {};

    // Basic required fields
    if (!formData.name?.trim()) {
        errors.name = "Video name is required";
    }

    if (!formData.summary?.trim()) {
        errors.summary = "Video summary is required";
    }

    // if (!formData.description?.trim()) {
    //     errors.description = "Description is required";
    // }

    return errors;
};

/**
 * Validates media fields
 * @param {Object} formData - Form data to validate
 * @returns {Object} Validation errors object
 */
export const validateMediaFields = (formData) => {
    const errors = {};

    if (!formData.id) {
        if (!formData.thumbnailUrl?.fileId?.trim()) {
            errors.thumbnailUrl = "Thumbnail is required";
        }
        if (!formData.videoUrl?.fileId?.trim()) {
            errors.videoUrl = "video  is required";
        }
    }

    return errors;
};

/**
 * Validates array fields
 * @param {Object} formData - Form data to validate
 * @returns {Object} Validation errors object
 */
export const validateArrayFields = (formData) => {
    const errors = {};

    if (!Array.isArray(formData.instructorIds) || formData.instructorIds.length === 0) {
        errors.instructorIds = "At least one instructor is required";
    }

    return errors;
};

/**
 * Validates attachments
 * @param {Array} attachments - Attachments array to validate
 * @returns {string|null} Error message or null
 */
export const validateAttachments = (attachments) => {
    if (!Array.isArray(attachments)) return null;

    const hasIncompleteAttachment = attachments.filter((a) => a.title?.trim() || a.description?.trim() || a.file?.trim()).some((a) => !a.title?.trim() || !a.description?.trim() || !a.file?.trim());

    return hasIncompleteAttachment ? "Each attachment must have title, description, and file" : null;
};

/**
 * Main validation function
 * @param {Object} formData - Complete form data to validate
 * @returns {Object} Combined validation errors
 */
export const validateVideoForm = (formData) => {
    const errors = {
        ...validateRequiredFields(formData),
        ...validateMediaFields(formData),
        ...validateArrayFields(formData),
    };

    // Validate attachments
    const attachmentsError = validateAttachments(formData.attachments);
    if (attachmentsError) {
        errors.attachments = attachmentsError;
    }

    return errors;
};

/**
 * Checks if form has any validation errors
 * @param {Object} errors - Validation errors object
 * @returns {boolean} True if there are errors
 */
export const hasValidationErrors = (errors) => {
    return Object.keys(errors).length > 0;
};
