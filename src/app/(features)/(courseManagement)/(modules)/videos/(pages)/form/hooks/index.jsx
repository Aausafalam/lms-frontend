"use client";

import { useState, useEffect } from "react";
import { useVideoCreate, useVideoUpdate } from "@/services/hooks/video";
import { useVideo } from "@/services/context/video";
import { validateVideoForm, hasValidationErrors } from "../utils/validation";
import { toast } from "@/components/ui/toast";
import { useQueryParams } from "@/lib/hooks/useQuery";

/**
 * Initial form data structure
 */
const getInitialFormData = () => ({
    name: "",
    summary: "",
    language: "en",
    thumbnailUrl: undefined,
    promoVideoUrl: undefined,
    description: "",
    transcript: "",
    tags: [],
    instructors: [],
    attachments: [{ title: "", description: "", file: "" }],
    status: "DRAFT",
    isFeatured: false,
});

/**
 * Custom hook for managing video form data and operations
 * @param {Object} params - Hook parameters
 * @param {Object} params.initialData - Initial video data
 * @returns {Object} Form state and handlers
 */
export function useVideoFormData({ initialData }) {
    const [formData, setFormData] = useState(getInitialFormData());
    const [isSaving, setIsSaving] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});
    const { courseId, moduleId, lessonId } = useQueryParams();
    const { videoCreate } = useVideoCreate();
    const { videoUpdate } = useVideoUpdate();
    const { videoDetails } = useVideo();

    // Initialize form with initial data
    useEffect(() => {
        if (initialData && Object.keys(initialData).length > 0) {
            setFormData((prev) => ({
                ...prev,
                ...initialData,
                attachments: initialData.attachments?.length ? initialData.attachments : [{ title: "", description: "", file: "" }],
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

    // Array field handlers factory
    const createArrayHandlers = (fieldName) => ({
        handleChange: (index, value) => {
            setFormData((prev) => {
                const updated = [...prev[fieldName]];
                updated[index] = value;
                return { ...prev, [fieldName]: updated };
            });
        },

        add: () => {
            setFormData((prev) => ({
                ...prev,
                [fieldName]: [...prev[fieldName], ""],
            }));
        },

        remove: (index) => {
            setFormData((prev) => {
                const updated = [...prev[fieldName]];
                updated.splice(index, 1);
                return { ...prev, [fieldName]: updated };
            });
        },
    });

    // Attachment handlers
    const handleAttachmentChange = (index, field, value) => {
        setFormData((prev) => {
            const updatedAttachments = [...prev.attachments];
            updatedAttachments[index] = {
                ...updatedAttachments[index],
                [field]: value,
            };

            // Clear validation errors if attachments are now valid
            setValidationErrors((prevErrors) => {
                const newErrors = { ...prevErrors };
                const invalidAttachment = updatedAttachments.some((a) => {
                    const hasAny = a.title?.trim() || a.description?.trim() || a.file?.trim();
                    const hasAll = a.title?.trim() && a.description?.trim() && a.file?.trim();
                    return hasAny && !hasAll;
                });

                if (!invalidAttachment) {
                    delete newErrors.attachments;
                }
                delete newErrors.serverError;
                return newErrors;
            });

            return { ...prev, attachments: updatedAttachments };
        });
    };

    const addAttachment = () => {
        setFormData((prev) => ({
            ...prev,
            attachments: [...prev.attachments, { title: "", description: "", file: "" }],
        }));
    };

    const removeAttachment = (index) => {
        setFormData((prev) => {
            const updatedAttachments = [...prev.attachments];
            updatedAttachments.splice(index, 1);
            return { ...prev, attachments: updatedAttachments };
        });
    };

    // Switch change handler
    const handleSwitchChange = (name, checked) => {
        setFormData((prev) => ({ ...prev, [name]: checked }));
    };

    // Save handler
    const handleSave = async () => {
        // Prepare payload
        const updatedPayload = {
            ...formData,
            attachments: formData.attachments.filter((item) => item.title?.trim() || item.description?.trim() || item.file?.trim()),
        };

        // Validate form
        const errors = validateVideoForm(updatedPayload);
        setValidationErrors(errors);

        if (hasValidationErrors(errors)) {
            toast.error("Please fix the validation errors before saving");
            return;
        }

        setIsSaving(true);
        try {
            if (updatedPayload.id) {
                // Update existing video
                await videoUpdate.execute({
                    dynamicRoute: `/${courseId}/module/${moduleId}/lesson/${lessonId}/video/${updatedPayload.id}`,
                    payload: updatedPayload,
                    onSuccess: () => {
                        toast.success("Video updated successfully!");
                        videoDetails.fetch?.({ dynamicRoute: `/${courseId}/module/${moduleId}/lesson/${lessonId}/video/${formData.id}`, isLoading: false });
                    },
                    onError: (error) => {
                        const errorMessage = error?.response?.data?.message || "Failed to update video";
                        setValidationErrors({ serverError: errorMessage });
                        toast.error(errorMessage);
                    },
                });
            } else {
                // Create new video
                await videoCreate.execute({
                    dynamicRoute: `/${courseId}/module/${moduleId}/lesson/${lessonId}/video`,
                    payload: updatedPayload,
                    onSuccess: () => {
                        toast.success("Video created successfully!");
                    },
                    onError: (error) => {
                        const errorMessage = error?.response?.data?.message || "Failed to create video";
                        setValidationErrors({ serverError: errorMessage });
                        toast.error("Please fix the validation errors before saving");
                    },
                });
            }
        } catch (err) {
            console.error("Save error:", err);
            const errorMessage = err.message || "An error occurred while saving the video";
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
            handleAttachmentChange,
            addAttachment,
            removeAttachment,
            handleSwitchChange,
        },
        handleSave,
        setFormData,
    };
}
