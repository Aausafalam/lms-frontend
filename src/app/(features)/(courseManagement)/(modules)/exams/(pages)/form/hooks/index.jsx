"use client";

import { useState, useEffect, useCallback } from "react";
import { useExamCreate, useExamUpdate } from "@/services/hooks/exam";
import { useExam } from "@/services/context/exam";
import { validateExamForm, hasValidationErrors } from "../utils/validation";
import { toast } from "@/components/ui/toast";
import { useQueryParams } from "@/lib/hooks/useQuery";

/**
 * Initial form data structure
 */
const getInitialFormData = () => ({
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
    examPattern: null,
    status: "DRAFT",
    isFeatured: false,
});

/**
 * Custom hook for managing exam form data and operations
 * @param {Object} params - Hook parameters
 * @param {Object} params.initialData - Initial exam data
 * @returns {Object} Form state and handlers
 */
export function useExamFormData({ initialData }) {
    const [formData, setFormData] = useState(getInitialFormData());
    const [isSaving, setIsSaving] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});
    const { courseId } = useQueryParams();
    const { examCreate } = useExamCreate();
    const { examUpdate } = useExamUpdate();
    const { examDetails } = useExam();

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

    // Generic input change handler
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        // Clear validation errors for this field
        if (validationErrors[name] || validationErrors?.serverError) {
            setValidationErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors.serverError;
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    /**
     * Handle array field changes (for multi-select fields)
     */
    const handleArrayChange = useCallback((name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear validation errors for this field
        if (validationErrors[name] || validationErrors?.serverError) {
            setValidationErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors.serverError;
                delete newErrors[name];
                return newErrors;
            });
        }
    }, []);

    /**
     * Handle exam pattern selection
     */
    const handleExamPatternSelect = useCallback((pattern) => {
        setFormData((prev) => ({ ...prev, examPattern: pattern }));
        // Clear validation errors for this field
        if (validationErrors["examPattern"] || validationErrors?.serverError) {
            setValidationErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors.serverError;
                delete newErrors["examPattern"];
                return newErrors;
            });
        }
    }, []);

    // Switch change handler
    const handleSwitchChange = (name, checked) => {
        setFormData((prev) => ({ ...prev, [name]: checked }));
    };

    // Save handler
    const handleSave = async () => {
        // Prepare payload
        const updatedPayload = {
            ...formData,
            durationInMinutes: Number.parseInt(formData.durationInMinutes, 10),
            examPattern: formData.examPattern,
        };

        // Validate form
        const errors = validateExamForm(updatedPayload);
        setValidationErrors(errors);

        if (hasValidationErrors(errors)) {
            toast.error("Please fix the validation errors before saving");
            return;
        }

        delete updatedPayload.promoVideoUrl;
        setIsSaving(true);
        try {
            if (updatedPayload.id) {
                // Update existing exam
                await examUpdate.execute({
                    dynamicRoute: `/${courseId}/exam/${updatedPayload.id}`,
                    payload: updatedPayload,
                    onSuccess: () => {
                        toast.success("Exam updated successfully!");
                        examDetails.fetch?.({ dynamicRoute: `/${courseId}/exam/${formData.id}`, isLoading: false });
                    },
                    onError: (error) => {
                        const errorMessage = error?.response?.data?.message || "Failed to update exam";
                        setValidationErrors({ serverError: errorMessage });
                        toast.error(errorMessage);
                    },
                });
            } else {
                // Create new exam
                await examCreate.execute({
                    dynamicRoute: `/${courseId}/exam`,
                    payload: updatedPayload,
                    onSuccess: () => {
                        toast.success("Exam created successfully!");
                    },
                    onError: (error) => {
                        const errorMessage = error?.response?.data?.message || "Failed to create exam";
                        setValidationErrors({ serverError: errorMessage });
                        toast.error("Please fix the validation errors before saving");
                    },
                });
            }
        } catch (err) {
            console.error("Save error:", err);
            const errorMessage = err.message || "An error occurred while saving the exam";
            toast.error(errorMessage);
        } finally {
            setIsSaving(false);
        }
    };

    return {
        formData,
        isSaving,
        validationErrors,
        handlers: {
            handleInputChange,
            handleSwitchChange,
            handleArrayChange,
            handleExamPatternSelect,
        },
        handleSave,
        setFormData,
    };
}
