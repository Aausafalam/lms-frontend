/**
 * Question form validation utilities
 * @description Reusable validation functions for question forms
 */

/**
 * Validates required fields
 * @param {Object} formData - Form data to validate
 * @returns {Object} Validation errors object
 */
export const validateRequiredFields = (formData) => {
    const errors = {};

    // Required field validation
    if (!formData.type?.trim()) {
        errors.type = "Question type is required";
    }
    if (!formData.text?.trim()) {
        errors.text = "Question text is required";
    }
    if (!formData.section?.trim()) {
        errors.section = "Section is required";
    }
    if (!formData.difficulty?.trim()) {
        errors.difficulty = "Difficulty level is required";
    }
    if (!formData.language?.trim()) {
        errors.language = "Language is required";
    }

    // Question type specific validation
    if (formData.type === "MCQ") {
        const hasCorrectOption = formData.options?.some((opt) => opt.isCorrect);
        if (!hasCorrectOption) {
            errors.options = "At least one correct option is required";
        }
        const hasEmptyOptions = formData.options?.some((opt) => !opt.text?.trim());
        if (hasEmptyOptions) {
            errors.options = "All options must have text";
        }
    } else if (formData.type === "TRUE_FALSE") {
        if (formData.answer?.value === undefined) {
            errors.answer = "Correct answer must be selected";
        }
    } else if (formData.type === "FILL_BLANKS") {
        if (!formData.answer?.text?.trim()) {
            errors.answer = "Correct answer is required";
        }
    } else if (formData.type === "NUMERIC") {
        if (formData.answer?.value === undefined || formData.answer?.value === "") {
            errors.answer = "Numeric answer is required";
        }
    }

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

    // if (!Array.isArray(formData.instructorIds) || formData.instructorIds.length === 0) {
    //     errors.instructorIds = "At least one instructor is required";
    // }

    return errors;
};

/**
 * Main validation function
 * @param {Object} formData - Complete form data to validate
 * @returns {Object} Combined validation errors
 */
export const validateQuestionForm = (formData) => {
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
