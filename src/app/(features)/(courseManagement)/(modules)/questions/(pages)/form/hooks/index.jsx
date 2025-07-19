"use client";

import { useState, useEffect, useCallback } from "react";
import { useQuestionCreate, useQuestionUpdate } from "@/services/hooks/question";
import { useQuestion } from "@/services/context/question";
import { validateQuestionForm, hasValidationErrors } from "../utils/validation";
import { toast } from "@/components/ui/toast";
import { useQueryParams } from "@/lib/hooks/useQuery";

/**
 * Initial form data structure
 */
const getInitialFormData = () => ({
    // Basic Details
    type: "MCQ",
    text: "",
    image: "",
    subject: "",
    difficulty: "easy",
    language: "en",

    tags: [],
    isPublic: false,

    // Question Content
    options: [
        { id: "a", text: "" },
        { id: "b", text: "" },
        { id: "c", text: "" },
        { id: "d", text: "" },
    ],
    answer: {},
    explanation: {},
});

/**
 * Custom hook for managing question form data and operations
 * @param {Object} params - Hook parameters
 * @param {Object} params.initialData - Initial question data
 * @returns {Object} Form state and handlers
 */
export function useQuestionFormData({ initialData }) {
    const [formData, setFormData] = useState(getInitialFormData());
    const [isSaving, setIsSaving] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});
    const { courseId, examId } = useQueryParams();
    const { questionCreate } = useQuestionCreate();
    const { questionUpdate } = useQuestionUpdate();
    const { questionDetails } = useQuestion();

    // Initialize form with initial data
    useEffect(() => {
        if (initialData && Object.keys(initialData).length > 0) {
            setFormData((prev) => ({
                ...prev,
                ...initialData,
            }));
        }
    }, [initialData]);

    // Generic input change handler
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

            // Clear validation errors for this field
            if (validationErrors[name] || validationErrors?.serverError) {
                setValidationErrors((prev) => {
                    const newErrors = { ...prev };
                    delete newErrors.serverError;
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
        // Clear validation errors for this field
        if (validationErrors["options"] || validationErrors?.serverError) {
            setValidationErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors.serverError;
                delete newErrors["options"];
                return newErrors;
            });
        }
    }, []);

    // Save handler
    const handleSave = async () => {
        // Prepare payload
        let updatedPayload = {
            ...formData,
        };

        if (formData.options?.length) {
            const correctOption = formData.options.find((option) => option.isCorrect)?.id || "not given";
            updatedPayload = {
                ...formData,
                options: formData.options?.map((option) => ({ ...option, isCorrect: undefined })),
                answer: {
                    ...formData.answer,
                    correctOption,
                },
            };

            // Update the state (this is asynchronous but we'll use the local updatedFormData for immediate use)
            handleInputChange({
                target: {
                    name: "answer",
                    value: {
                        ...formData.answer,
                        correctOption,
                    },
                },
            });
        }

        // Validate form
        const errors = validateQuestionForm(updatedPayload);
        setValidationErrors(errors);

        if (hasValidationErrors(errors)) {
            toast.error("Please fix the validation errors before saving");
            return;
        }

        delete updatedPayload.promoVideoUrl;
        setIsSaving(true);
        try {
            if (updatedPayload.id) {
                // Update existing question
                await questionUpdate.execute({
                    dynamicRoute: `/${courseId}/exam/${examId}/question/${updatedPayload.id}`,
                    payload: updatedPayload,
                    onSuccess: () => {
                        toast.success("Question updated successfully!");
                        questionDetails.fetch?.({ dynamicRoute: `/${courseId}/exam/${examId}/question/${formData.id}`, isLoading: false });
                    },
                    onError: (error) => {
                        const errorMessage = error?.response?.data?.message || "Failed to update question";
                        setValidationErrors({ serverError: errorMessage });
                        toast.error(errorMessage);
                    },
                });
            } else {
                // Create new question
                await questionCreate.execute({
                    dynamicRoute: `/${courseId}/exam/${examId}/question`,
                    payload: updatedPayload,
                    onSuccess: () => {
                        toast.success("Question created successfully!");
                    },
                    onError: (error) => {
                        const errorMessage = error?.response?.data?.message || "Failed to create question";
                        setValidationErrors({ serverError: errorMessage });
                        toast.error("Please fix the validation errors before saving");
                    },
                });
            }
        } catch (err) {
            console.error("Save error:", err);
            const errorMessage = err.message || "An error occurred while saving the question";
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
            handleOptionsChange,
        },
        handleSave,
        setFormData,
    };
}
