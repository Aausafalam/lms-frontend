"use client";

import { useQueryParams } from "@/lib/hooks/useQuery";
import { useExamBuilderCreate } from "@/services/hooks/exam-builder";
import { useState, useEffect, useCallback } from "react";

/**
 * Custom hook for managing exam builder form data and operations
 */
export function useExamBuilderFormData({ initialData }) {
    const [formData, setFormData] = useState({
        // Basic Details
        name: "",
        examCode: "",
        description: "",
        startDate: "",
        startTime: "",
        endTime: "",
        examType: "",
        durationInMinutes: "",
        isPublished: false,
        version: "1.0.0",
        languageOptions: [],
        tags: [],

        // Exam Pattern (JSON field)
        examPattern: null,

        // Status
        status: "DRAFT",
    });

    const { courseId } = useQueryParams();
    const { examBuilderCreate } = useExamBuilderCreate();
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
        const requiredFields = ["name", "examCode", "examType", "durationInMinutes"];
        totalFields += requiredFields.length;
        completedFields += requiredFields.filter((field) => formData[field]).length;

        // Exam pattern
        totalFields += 1;
        if (formData.examPattern) completedFields++;

        const calculatedProgress = Math.round((completedFields / totalFields) * 100);
        setProgress(calculatedProgress);
    }, [formData]);

    /**
     * Handle basic input changes with validation cleanup
     */
    const handleInputChange = useCallback(
        (e) => {
            const { name, value } = e.target;
            setFormData((prev) => ({ ...prev, [name]: value }));

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
        setFormData((prev) => ({ ...prev, [name]: checked }));
    }, []);

    /**
     * Handle array field changes (for multi-select fields)
     */
    const handleArrayChange = useCallback((name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    }, []);

    /**
     * Handle exam pattern selection
     */
    const handleExamPatternSelect = useCallback((pattern) => {
        setFormData((prev) => ({ ...prev, examPattern: pattern }));
    }, []);

    /**
     * Validate form data before saving
     */
    const validateForm = useCallback(() => {
        const errors = {};

        // Required field validation
        if (!formData.name?.trim()) {
            errors.name = "Exam name is required";
        }
        if (!formData.examCode?.trim()) {
            errors.examCode = "Exam code is required";
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

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    }, [formData]);

    /**
     * Save form data
     */
    const handleSave = useCallback(async () => {
        setError(null);
        setSuccess(false);
        console.log("Prof. John Doe");
        if (!validateForm()) {
            setError("Please fix the validation errors before saving");
            return;
        }

        setIsSaving(true);

        try {
            console.log("Saving exam builder data:", formData);

            // Prepare payload with examPattern as JSON
            const payload = {
                ...formData,
                durationInMinutes: Number.parseInt(formData.durationInMinutes, 10),
                examPattern: formData.examPattern, // This will be stored as JSON
            };

            examBuilderCreate.execute({
                dynamicRoute: `/${courseId}/exam`,
                payload,
                onSuccess: () => setSuccess(true),
                onError: () => setTimeout(() => setSuccess(false), 5000),
            });
        } catch (err) {
            console.error("Save error:", err);
            setError(err.message || "An error occurred while saving the exam");
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
            handleExamPatternSelect,
        },
        handleSave,
        setFormData,
        setError,
        setSuccess,
    };
}
