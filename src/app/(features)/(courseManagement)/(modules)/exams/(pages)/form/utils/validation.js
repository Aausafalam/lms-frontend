/**
 * Exam form validation utilities
 * @description Reusable validation functions for exam forms
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
        errors.name = "Exam name is required";
    }

    if (!formData.examType?.trim()) {
        errors.examType = "Exam type is required";
    }
    if (!formData.durationInMinutes || formData.durationInMinutes < 1) {
        errors.durationInMinutes = "Duration must be at least 1 minute";
    }
    // Date/time validation
    if (formData.startDate && formData.endTime && formData.startTime) {
        const startDateTime = new Date(`${formData.startDate}T${formData.startTime}`);
        const endDateTime = new Date(`${formData.startDate}T${formData.endTime}`);

        if (endDateTime <= startDateTime) {
            errors.endTime = "End time must be after start time";
        }
    }

    // Exam code validation
    if (!formData.examCode?.trim()) {
        errors.examCode = "Exam code is required";
    } else if (!/^[a-zA-Z0-9]+$/.test(formData.examCode.trim())) {
        errors.examCode = "Exam code must contain only letters and numbers";
    }

    // Version validation
    if (!formData.version?.trim()) {
        errors.version = "Version is required";
    } else if (!/^\d+\.\d+\.\d+$/.test(formData.version.trim())) {
        errors.version = "Version must follow semantic versioning (e.g., 1.0.0)";
    }

    // Exam pattern validation
    if (!formData.examPattern || typeof formData.examPattern !== "object" || Array.isArray(formData.examPattern)) {
        errors.examPattern = "examPattern must be of type object";
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

    if (!Array.isArray(formData.languageOptions) || formData.languageOptions.length === 0) {
        errors.languageOptions = "At least one Language is required";
    }

    return errors;
};

/**
 * Main validation function
 * @param {Object} formData - Complete form data to validate
 * @returns {Object} Combined validation errors
 */
export const validateExamForm = (formData) => {
    const errors = {
        ...validateRequiredFields(formData),
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
