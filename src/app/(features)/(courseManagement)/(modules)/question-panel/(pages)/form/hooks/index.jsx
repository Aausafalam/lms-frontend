"use client";

import { useQueryParams } from "@/lib/hooks/useQuery";
import { useQuestionCreate } from "@/services/hooks/question-panel";
import { useState, useEffect, useCallback } from "react";

/**
 * Custom hook for managing question form data and operations
 */
export function useQuestionFormData({ initialData }) {
    const [formData, setFormData] = useState({
        // Basic Details
        type: "MCQ",
        text: "",
        image: "",
        category: "",
        subject: "",
        difficulty: "easy",
        language: "en",

        tags: [],
        isPublic: false,

        // Question Content
        options: [
            { id: "a", text: "", isCorrect: false },
            { id: "b", text: "", isCorrect: false },
            { id: "c", text: "", isCorrect: false },
            { id: "d", text: "", isCorrect: false },
        ],
        answer: {},
        explanation: {},
    });

    const { courseId } = useQueryParams();
    const { questionCreate } = useQuestionCreate();
    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});

    /**
     * Initialize form data with provided initial data
     */
    useEffect(() => {
        if (initialData && Object.keys(initialData).length > 0) {
            setFormData((prev) => ({
                ...prev,
                ...initialData,
            }));
        }
    }, [initialData]);

    /**
     * Calculate form completion progress
     */
    useEffect(() => {
        let totalFields = 0;
        let completedFields = 0;

        // Basic required fields
        const requiredFields = ["type", "text", "category", "difficulty", "language", "points"];
        totalFields += requiredFields.length;
        completedFields += requiredFields.filter((field) => formData[field]).length;

        // Question type specific requirements
        if (formData.type === "MCQ" || formData.type === "MULTI_SELECT") {
            totalFields += 1;
            if (formData.options && formData.options.some((opt) => opt.isCorrect)) completedFields++;
        } else if (formData.type === "TRUE_FALSE") {
            totalFields += 1;
            if (formData.answer && formData.answer.value !== undefined) completedFields++;
        } else if (formData.type === "FILL_BLANKS" || formData.type === "NUMERIC") {
            totalFields += 1;
            if (formData.answer && formData.answer.text) completedFields++;
        }

        const calculatedProgress = Math.round((completedFields / totalFields) * 100);
        setProgress(calculatedProgress);
    }, [formData]);

    /**
     * Handle basic input changes with validation cleanup
     */
    const handleInputChange = useCallback(
        (e) => {
            const { name, value } = e.target;

            // Handle nested object updates
            if (name.includes(".")) {
                const [parent, child] = name.split(".");
                setFormData((prev) => ({
                    ...prev,
                    [parent]: {
                        ...prev[parent],
                        [child]: value,
                    },
                }));
            } else {
                setFormData((prev) => ({ ...prev, [name]: value }));
            }

            // Clear validation errors for the field
            if (validationErrors[name]) {
                setValidationErrors((prev) => {
                    const newErrors = { ...prev };
                    delete newErrors[name];
                    return newErrors;
                });
            }
        },
        [validationErrors]
    );

    /**
     * Handle switch/toggle changes
     */
    const handleSwitchChange = useCallback((name, checked) => {
        if (name.includes(".")) {
            const [parent, child] = name.split(".");
            setFormData((prev) => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: checked,
                },
            }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: checked }));
        }
    }, []);

    /**
     * Handle array field changes (for multi-select fields)
     */
    const handleArrayChange = useCallback((name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    }, []);

    /**
     * Handle options changes for MCQ questions
     */
    const handleOptionsChange = useCallback((options) => {
        setFormData((prev) => ({ ...prev, options }));
    }, []);

    /**
     * Validate form data before saving
     */
    const validateForm = useCallback(() => {
        const errors = {};

        // Required field validation
        if (!formData.type?.trim()) {
            errors.type = "Question type is required";
        }
        if (!formData.text?.trim()) {
            errors.text = "Question text is required";
        }
        if (!formData.category?.trim()) {
            errors.category = "Category is required";
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

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    }, [formData]);

    /**
     * Save form data
     */
    const handleSave = useCallback(async () => {
        setError(null);
        setSuccess(false);

        if (!validateForm()) {
            setError("Please fix the validation errors before saving");
            return;
        }

        setIsSaving(true);

        try {
            console.log("Saving question data:", formData);

            // Prepare payload
            const payload = {
                ...formData,
            };

            questionCreate.execute({
                dynamicRoute: `/questions`,
                payload,
                onSuccess: () => setSuccess(true),
                onError: () => setTimeout(() => setSuccess(false), 5000),
            });
        } catch (err) {
            console.error("Save error:", err);
            setError(err.message || "An error occurred while saving the question");
            throw err;
        } finally {
            setIsSaving(false);
        }
    }, [formData, validateForm, courseId]);

    return {
        formData,
        progress,
        isLoading,
        isSaving,
        error,
        success,
        validationErrors,
        handlers: {
            handleInputChange,
            handleSwitchChange,
            handleArrayChange,
            handleOptionsChange,
        },
        handleSave,
        setFormData,
        setError,
        setSuccess,
    };
}
