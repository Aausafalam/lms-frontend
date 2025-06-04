"use client";

import { useQueryParams } from "@/lib/hooks/useQuery";
import { useLessonCreate } from "@/services/hooks/lesson";
import { useState, useEffect, useCallback } from "react";

export function useLessonFormData({ initialData }) {
    const [formData, setFormData] = useState({
        // Basic Information
        name: "",
        summary: "",
        duration: 45,
        lessonOrder: 1,

        // Media
        bannerImage: null,
        bannerImagePreview: "",
        thumbImage: null,
        thumbImagePreview: "",
        introVideo: "",
        introVideoFile: null,
        introVideoPreview: "",

        // Content
        description: "<p>Enter detailed description here...</p>",

        // Learning Outcomes
        learningOutcomes: [""],

        // Prerequisites
        preRequisites: [""],

        // Meta Data
        tags: [],

        // Instructors
        instructorIds: [],

        // Attachments
        attachments: [{ title: "", type: "", url: "" }],

        // Additional Resources
        resources: [{ title: "", url: "" }],

        // Status
        status: "DRAFT",
    });
    const { courseId, moduleId } = useQueryParams();
    const { lessonCreate } = useLessonCreate();
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
                learningOutcomes: initialData.learningOutcomes?.length ? initialData.learningOutcomes : [""],
                preRequisites: initialData.preRequisites?.length ? initialData.preRequisites : [""],
                instructorIds: initialData.instructorIds?.length ? initialData.instructorIds : [],
                attachments: initialData.attachments?.length ? initialData.attachments : [{ title: "", type: "", url: "" }],
                resources: initialData.resources?.length ? initialData.resources : [{ title: "", url: "" }],
            }));
        }
    }, [initialData]);

    useEffect(() => {
        let totalFields = 0;
        let completedFields = 0;

        const basicFields = ["name", "summary", "duration", "lessonOrder"];
        totalFields += basicFields.length;
        completedFields += basicFields.filter((field) => formData[field]).length;

        totalFields += 3;
        if (formData.bannerImagePreview) completedFields++;
        if (formData.thumbImagePreview) completedFields++;
        if (formData.introVideo) completedFields++;

        totalFields += 1;
        if (formData.description && formData.description !== "<p>Enter detailed description here...</p>") completedFields++;

        totalFields += 1;
        if (formData.learningOutcomes.some((outcome) => outcome.trim() !== "")) completedFields++;

        totalFields += 1;
        if (formData.preRequisites.some((prereq) => prereq.trim() !== "")) completedFields++;

        totalFields += 1;
        if (formData.tags.length > 0) completedFields++;

        totalFields += 1;
        if (formData.instructorIds.some((instructor) => instructor.trim() !== "")) completedFields++;

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

    const handleVideoUpload = useCallback((e) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 100 * 1024 * 1024) {
                setError("Video file size must be less than 100MB");
                return;
            }

            if (!file.type.startsWith("video/")) {
                setError("Please upload a valid video file");
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prev) => ({
                    ...prev,
                    introVideoFile: file,
                    introVideoPreview: reader.result,
                    introVideo: file,
                }));
            };
            reader.readAsDataURL(file);
        }
    }, []);

    const handleLearningOutcomeChange = useCallback((index, value) => {
        setFormData((prev) => {
            const updatedOutcomes = [...prev.learningOutcomes];
            updatedOutcomes[index] = value;
            return { ...prev, learningOutcomes: updatedOutcomes };
        });
    }, []);

    const addLearningOutcome = useCallback(() => {
        setFormData((prev) => ({
            ...prev,
            learningOutcomes: [...prev.learningOutcomes, ""],
        }));
    }, []);

    const removeLearningOutcome = useCallback((index) => {
        setFormData((prev) => {
            const updatedOutcomes = [...prev.learningOutcomes];
            updatedOutcomes.splice(index, 1);
            return { ...prev, learningOutcomes: updatedOutcomes };
        });
    }, []);

    const handlePreRequisiteChange = useCallback((index, value) => {
        setFormData((prev) => {
            const updatedPreRequisites = [...prev.preRequisites];
            updatedPreRequisites[index] = value;
            return { ...prev, preRequisites: updatedPreRequisites };
        });
    }, []);

    const addPreRequisite = useCallback(() => {
        setFormData((prev) => ({
            ...prev,
            preRequisites: [...prev.preRequisites, ""],
        }));
    }, []);

    const removePreRequisite = useCallback((index) => {
        setFormData((prev) => {
            const updatedPreRequisites = [...prev.preRequisites];
            updatedPreRequisites.splice(index, 1);
            return { ...prev, preRequisites: updatedPreRequisites };
        });
    }, []);

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
            attachments: [...prev.attachments, { title: "", type: "", url: "" }],
        }));
    }, []);

    const removeAttachment = useCallback((index) => {
        setFormData((prev) => {
            const updatedAttachments = [...prev.attachments];
            updatedAttachments.splice(index, 1);
            return { ...prev, attachments: updatedAttachments };
        });
    }, []);

    const handleResourceChange = useCallback((index, field, value) => {
        setFormData((prev) => {
            const updatedResources = [...prev.resources];
            updatedResources[index] = {
                ...updatedResources[index],
                [field]: value,
            };
            return { ...prev, resources: updatedResources };
        });
    }, []);

    const addResource = useCallback(() => {
        setFormData((prev) => ({
            ...prev,
            resources: [...prev.resources, { title: "", url: "" }],
        }));
    }, []);

    const removeResource = useCallback((index) => {
        setFormData((prev) => {
            const updatedResources = [...prev.resources];
            updatedResources.splice(index, 1);
            return { ...prev, resources: updatedResources };
        });
    }, []);

    const handleSwitchChange = useCallback((name, checked) => {
        setFormData((prev) => ({ ...prev, [name]: checked }));
    }, []);

    const validateForm = useCallback(() => {
        const errors = {};

        if (!formData.name?.trim()) {
            errors.name = "Lesson name is required";
        }
        if (!formData.summary?.trim()) {
            errors.summary = "Lesson summary is required";
        }
        if (!formData.duration || formData.duration < 1) {
            errors.duration = "Duration is required and must be at least 1 minute";
        }
        if (!formData.lessonOrder || formData.lessonOrder < 1) {
            errors.lessonOrder = "Lesson order is required and must be at least 1";
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
                if (key.includes("Preview") || key.includes("Image") || key.includes("File")) {
                    return;
                }

                const value = formData[key];
                if (value !== null && value !== undefined) {
                    formDataToSubmit.append(key, value);
                }
            });

            if (formData.bannerImage instanceof File) {
                formDataToSubmit.append("bannerImage", formData.bannerImage);
            }
            if (formData.thumbImage instanceof File) {
                formDataToSubmit.append("thumbImage", formData.thumbImage);
            }
            if (formData.introVideoFile instanceof File) {
                formDataToSubmit.append("introVideoFile", formData.introVideoFile);
            }

            lessonCreate.execute({
                dynamicRoute: `/${courseId}/module/${moduleId}/lesson`,
                payload: formData,
                onSuccess: () => setSuccess(true),
                onError: () => setTimeout(() => setSuccess(false), 5000),
            });

            setSuccess(true);
            setTimeout(() => setSuccess(false), 5000);
        } catch (err) {
            console.error("Save error:", err);
            setError(err.message || "An error occurred while saving the lesson");
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
            handleVideoUpload,
            handleLearningOutcomeChange,
            addLearningOutcome,
            removeLearningOutcome,
            handlePreRequisiteChange,
            addPreRequisite,
            removePreRequisite,
            handleAttachmentChange,
            addAttachment,
            removeAttachment,
            handleResourceChange,
            addResource,
            removeResource,
            handleSwitchChange,
        },
        handleSave,
        setFormData,
        setError,
        setSuccess,
    };
}
