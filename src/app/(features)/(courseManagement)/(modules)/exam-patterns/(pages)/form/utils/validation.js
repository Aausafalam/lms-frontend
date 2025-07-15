/**
 * ExamPattern form validation utilities
 * @description Reusable validation functions for examPattern forms
 */

/**
 * Validates required fields
 * @param {Object} formData - Form data to validate
 * @returns {Object} Validation errors object
 */
export const validateRequiredFields = (formData) => {
    const errors = {};

    if (!formData.name?.trim()) {
        errors.name = "Exam pattern name is required";
    }
    if (!formData.description?.trim()) {
        errors.description = "Description is required";
    }
    if (!formData.sections?.length) {
        errors.sections = "At least one section is required";
    }
    // Validate sections
    formData.sections?.forEach((section, index) => {
        if (!section.name?.trim()) {
            errors[`section_${index}_name`] = `Section ${index + 1} name is required`;
        }
        if (!section.questionsCount || section.questionsCount < 1) {
            errors[`section_${index}_questions`] = `Section ${index + 1} must have at least 1 question`;
        }
        if (!section.questionsToAttempt || section.questionsToAttempt < 1) {
            errors[`section_${index}_attempt`] = `Section ${index + 1} must have at least 1 question to attempt`;
        }
        if (section.questionsToAttempt > section.questionsCount) {
            errors[`section_${index}_attempt_exceed`] = `Section ${index + 1} cannot have more questions to attempt than total questions`;
        }
    });
    return errors;
};

/**
 * Validates media fields
 * @param {Object} formData - Form data to validate
 * @returns {Object} Validation errors object
 */
export const validateMediaFields = (formData) => {
    const errors = {};

    return errors;
};

/**
 * Validates array fields
 * @param {Object} formData - Form data to validate
 * @returns {Object} Validation errors object
 */
export const validateArrayFields = (formData) => {
    const errors = {};

    return errors;
};

/**
 * Main validation function
 * @param {Object} formData - Complete form data to validate
 * @returns {Object} Combined validation errors
 */
export const validateExamPatternForm = (formData) => {
    const errors = {
        ...validateRequiredFields(formData),
        ...validateMediaFields(formData),
        ...validateArrayFields(formData),
    };

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
