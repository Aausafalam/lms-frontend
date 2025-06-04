"use client";

import { useQueryParams } from "@/lib/hooks/useQuery";
import { useContentCreate } from "@/services/hooks/content";
import { useState, useEffect, useCallback } from "react";

export function useContentFormData({ initialData }) {
    const [formData, setFormData] = useState({
        // Basic Information
        name: "",
        summary: "",
        language: "en",

        // Media
        thumbnail: null,
        thumbnailPreview: "",
        videoUrl: "",

        // Content
        description: "",

        // Transcript
        transcript: "",

        // Instructors
        instructorIds: [],

        // tags
        tags: [],

        attachments: [{ title: "", description: "", file: "" }],

        // Status
        status: "DRAFT",
    });
    const { lessonId, courseId, moduleId } = useQueryParams();
    const { contentCreate } = useContentCreate();
    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});

    useEffect(() => {
        if (initialData && Object.keys(initialData).length > 0) {
            setFormData((prev) => ({
                ...prev,
                ...initialData,
                instructorIds: initialData.instructorIds?.length ? initialData.instructorIds : [],
                attachments: initialData.attachments?.length ? initialData.attachments : [{ title: "", description: "", file: "" }],
                tags: initialData.tags?.length ? initialData.tags : [],
            }));
        }
    }, [initialData]);

    useEffect(() => {
        let totalFields = 0;
        let completedFields = 0;

        const basicFields = ["type", "name", "summary", "duration", "language"];
        totalFields += basicFields.length;
        completedFields += basicFields.filter((field) => formData[field]).length;

        totalFields += 1;
        if (formData.thumbnailPreview) completedFields++;

        totalFields += 1;
        if (formData.url) completedFields++;

        totalFields += 1;
        if (formData.description) completedFields++;

        totalFields += 1;
        if (formData.transcript) completedFields++;

        totalFields += 1;
        if (formData.instructorIds.length > 0) completedFields++;

        totalFields += 1;
        if (formData.tags.length > 0) completedFields++;

        const calculatedProgress = Math.round((completedFields / totalFields) * 100);
        setProgress(calculatedProgress);
    }, [formData]);

    const handleInputChange = useCallback(
        (e) => {
            const { name, value } = e.target;
            setFormData((prev) => ({ ...prev, [name]: value }));

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

    const handleImageUpload = useCallback((e) => {
        const file = e.target.files?.[0];
        const fieldName = e.target.name;

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prev) => ({
                    ...prev,
                    [fieldName]: file,
                    [`${fieldName}Preview`]: reader.result,
                }));
            };
            reader.readAsDataURL(file);
        }
    }, []);

    const handleSwitchChange = useCallback((name, checked) => {
        setFormData((prev) => ({ ...prev, [name]: checked }));
    }, []);

    // Attachment handlers
    const handleAttachmentChange = useCallback((index, field, value) => {
        setFormData((prev) => {
            const updatedAttachments = [...prev.attachments];
            updatedAttachments[index] = {
                ...updatedAttachments[index],
                [field]: value,
            };
            return { ...prev, attachments: updatedAttachments };
        });
    }, []);

    const addAttachment = useCallback(() => {
        setFormData((prev) => ({
            ...prev,
            attachments: [...prev.attachments, { title: "", description: "", file: "" }],
        }));
    }, []);

    const removeAttachment = useCallback((index) => {
        setFormData((prev) => {
            const updatedAttachments = [...prev.attachments];
            updatedAttachments.splice(index, 1);
            return { ...prev, attachments: updatedAttachments };
        });
    }, []);

    const validateForm = useCallback(() => {
        const errors = {};

        if (!formData.name?.trim()) {
            errors.name = "Content name is required";
        }
        if (!formData.summary?.trim()) {
            errors.summary = "Content summary is required";
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    }, [formData]);

    const handleSave = useCallback(async () => {
        setError(null);
        setSuccess(false);

        if (!validateForm()) {
            setError("Please fix the validation errors before saving");
            return;
        }

        setIsSaving(true);

        try {
            const formDataToSubmit = new FormData();

            Object.keys(formData).forEach((key) => {
                if (key.includes("Preview")) {
                    return;
                }

                const value = formData[key];
                if (value !== null && value !== undefined) {
                    formDataToSubmit.append(key, value);
                }
            });

            if (formData.thumbnail instanceof File) {
                formDataToSubmit.append("thumbnail", formData.thumbnail);
            }

            contentCreate.execute({
                dynamicRoute: `/${courseId}/module/${moduleId}/lesson/${lessonId}/video`,
                payload: formData,
                onSuccess: () => setSuccess(true),
                onError: () => setTimeout(() => setSuccess(false), 5000),
            });

            setSuccess(true);
            setTimeout(() => setSuccess(false), 5000);
        } catch (err) {
            console.error("Save error:", err);
            setError(err.message || "An error occurred while saving the content");
            throw err;
        } finally {
            setIsSaving(false);
        }
    }, [formData, validateForm]);

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
            handleImageUpload,
            handleSwitchChange,
            handleAttachmentChange,
            addAttachment,
            removeAttachment,
        },
        handleSave,
        setFormData,
        setError,
        setSuccess,
    };
}
