"use client";

import { useQueryParams } from "@/lib/hooks/useQuery";
import { useModuleCreate, useModuleUpdate } from "@/services/hooks/module";
import { useState, useEffect, useCallback } from "react";

export function useModuleFormData({ initialData }) {
    const [formData, setFormData] = useState({
        name: "",
        summary: "",
        duration: 45,
        moduleOrder: 1,
        bannerImage: null,
        bannerImagePreview: "",
        thumbImage: null,
        thumbImagePreview: "",
        introVideo: "",
        introVideoFile: null,
        introVideoPreview: "",
        description: "<p>Enter detailed description here...</p>",
        learningOutcomes: [""],
        preRequisites: [""],
        categoryIds: [],
        tags: [],
        instructorIds: [],
        attachments: [{ title: "", type: "", url: "" }],
        resources: [{ title: "", link: "" }],
        status: "DRAFT",
    });

    const { courseId } = useQueryParams();
    const { moduleCreate } = useModuleCreate();
    const { moduleUpdate } = useModuleUpdate();
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
                categoryIds: initialData.categoryIds?.length ? initialData.categoryIds : [],
                instructorIds: initialData.instructorIds?.length ? initialData.instructorIds : [],
                attachments: initialData.attachments?.length ? initialData.attachments : [{ title: "", type: "", url: "" }],
                resources: initialData.resources?.length ? initialData.resources : [{ title: "", url: "" }],
            }));
        }
    }, [initialData]);

    useEffect(() => {
        let totalFields = 0;
        let completedFields = 0;

        const basicFields = ["name", "summary", "duration", "moduleOrder"];
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
        if (formData.categoryIds.length > 0) completedFields++;

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
            resources: [...prev.resources, { title: "", link: "" }],
        }));
    }, []);

    const removeResource = useCallback((index) => {
        setFormData((prev) => {
            const updatedResources = [...prev.resources];
            updatedResources.splice(index, 1);
            return { ...prev, resources: updatedResources };
        });
    }, []);

    const validateForm = useCallback(() => {
        const errors = {};

        if (!formData.name?.trim()) {
            errors.name = "Module name is required";
        }
        if (!formData.summary?.trim()) {
            errors.summary = "Module summary is required";
        }
        if (!formData.duration || formData.duration < 1) {
            errors.duration = "Duration is required and must be at least 1 minute";
        }
        if (!formData.moduleOrder || formData.moduleOrder < 1) {
            errors.moduleOrder = "Module order is required and must be at least 1";
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
        delete formData.promoVideoUrl;
        try {
            if (formData.id) {
                moduleUpdate.execute({
                    dynamicRoute: `/${courseId}/module/${formData.id}`,
                    payload: formData,
                    onSuccess: () => {
                        setSuccess(true);
                        setTimeout(() => setSuccess(false), 5000);
                    },
                    onError: (error) => {
                        setError(error.message || "Failed to save module");
                        setTimeout(() => setError(null), 5000);
                    },
                });
            } else {
                moduleCreate.execute({
                    dynamicRoute: `/${courseId}/module`,
                    payload: formData,
                    onSuccess: () => {
                        setSuccess(true);
                        setTimeout(() => setSuccess(false), 5000);
                    },
                    onError: (error) => {
                        setError(error.message || "Failed to save module");
                        setTimeout(() => setError(null), 5000);
                    },
                });
            }
        } catch (err) {
            console.error("Save error:", err);
            setError(err.message || "An error occurred while saving the module");
        } finally {
            setIsSaving(false);
        }
    }, [formData, validateForm, courseId, moduleCreate]);

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
        },
        handleSave,
        setFormData,
        setError,
        setSuccess,
    };
}
