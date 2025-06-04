"use client";

// modules/form/hooks/index.jsx

// Import necessary hooks and utilities
import { useState, useEffect, useCallback } from "react";
import { useModuleCreate } from "@/services/hooks/module";
import { useParams } from "next/navigation";
import { useQueryParams } from "@/lib/hooks/useQuery";
/**
 * Custom hook for managing module form data and operations
 * @param {Object} params - Hook parameters
 * @param {Object} params.initialData - Initial module data
 * @returns {Object} Form state and handlers
 */
export function useModuleFormData({ initialData }) {
    // Initialize form data with module structure
    const [formData, setFormData] = useState({
        // Basic Information
        name: "",
        summary: "",
        duration: 45,
        moduleOrder: 1,

        // Media
        bannerImage: null,
        bannerImagePreview: "",
        thumbnailUrl: null,
        thumbnailPreview: "",
        introVideo: "", // Can be URL string or File object
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
        categoryIds: [],

        // Instructors
        instructorIds: [],

        // Attachments
        attachments: [{ title: "", description: "", file: "" }],

        // Additional Resources
        resources: [{ title: "", link: "" }],

        // Status
        status: "DRAFT",
    });
    const { courseId } = useQueryParams();
    const { moduleCreate } = useModuleCreate();
    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});

    // Initialize form with initial data if provided
    useEffect(() => {
        if (initialData && Object.keys(initialData).length > 0) {
            setFormData((prev) => ({
                ...prev,
                ...initialData,
                learningOutcomes: initialData.learningOutcomes?.length ? initialData.learningOutcomes : [""],
                preRequisites: initialData.preRequisites?.length ? initialData.preRequisites : [""],
                attachments: initialData.attachments?.length ? initialData.attachments : [{ title: "", description: "", file: "" }],
                resources: initialData.resources?.length ? initialData.resources : [{ title: "", url: "" }],
            }));
        }
    }, [initialData]);

    // Calculate form completion progress
    useEffect(() => {
        let totalFields = 0;
        let completedFields = 0;

        // Basic fields
        const basicFields = ["name", "summary", "duration", "moduleOrder"];
        totalFields += basicFields.length;
        completedFields += basicFields.filter((field) => formData[field]).length;

        // Media fields
        totalFields += 3; // Banner image, thumbnail, and intro video
        if (formData.bannerImagePreview) completedFields++;
        if (formData.thumbnailPreview) completedFields++;
        if (formData.introVideo) completedFields++;

        // Content fields
        totalFields += 1; // Description
        if (formData.description && formData.description !== "<p>Enter detailed description here...</p>") completedFields++;

        // Learning outcomes
        totalFields += 1;
        if (formData.learningOutcomes.some((outcome) => outcome.trim() !== "")) completedFields++;

        // Prerequisites
        totalFields += 1;
        if (formData.preRequisites.some((prereq) => prereq.trim() !== "")) completedFields++;

        // Meta data
        totalFields += 2; // tags, categories
        if (formData.tags.length > 0) completedFields++;
        if (formData.categoryIds.length > 0) completedFields++;

        // Instructors
        totalFields += 1;
        if (formData.instructorIds.length > 0) completedFields++;

        const calculatedProgress = Math.round((completedFields / totalFields) * 100);
        setProgress(calculatedProgress);
    }, [formData]);

    // Generic input change handler
    const handleInputChange = useCallback(
        (e) => {
            const { name, value } = e.target;
            setFormData((prev) => ({ ...prev, [name]: value }));

            // Clear validation error for this field
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

    // Image upload handlers
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

    // Video upload handler
    const handleVideoUpload = useCallback((e) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validate file size (100MB limit)
            if (file.size > 100 * 1024 * 1024) {
                setError("Video file size must be less than 100MB");
                return;
            }

            // Validate file type
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
                    introVideo: file, // Set as file object
                }));
            };
            reader.readAsDataURL(file);
        }
    }, []);

    // Learning outcomes handlers
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

    // Prerequisites handlers
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

    // Resource handlers
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

    // Switch change handler
    const handleSwitchChange = useCallback((name, checked) => {
        setFormData((prev) => ({ ...prev, [name]: checked }));
    }, []);

    // Form validation
    const validateForm = useCallback(() => {
        const errors = {};

        // Required basic fields
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

    // Save handler
    const handleSave = useCallback(async () => {
        setError(null);
        setSuccess(false);

        // Validate form
        if (!validateForm()) {
            setError("Please fix the validation errors before saving");
            return;
        }

        setIsSaving(true);

        try {
            // Prepare form data for submission
            const formDataToSubmit = new FormData();

            // Add all text fields
            Object.keys(formData).forEach((key) => {
                if (key.includes("Preview") || key.includes("Image") || key.includes("File")) {
                    return; // Skip preview and file fields
                }

                const value = formData[key];
                if (value !== null && value !== undefined) {
                    formDataToSubmit.append(key, value);
                }
            });

            // Add file uploads
            if (formData.bannerImage instanceof File) {
                formDataToSubmit.append("bannerImage", formData.bannerImage);
            }
            if (formData.thumbnailUrl instanceof File) {
                formDataToSubmit.append("thumbnailImage", formData.thumbnailUrl);
            }
            if (formData.introVideoFile instanceof File) {
                formDataToSubmit.append("introVideoFile", formData.introVideoFile);
            }

            console.log(formData, "formData,formData");

            moduleCreate.execute({ dynamicRoute: `/${courseId}/module`, payload: formData, onSuccess: () => setSuccess(true), onError: () => setTimeout(() => setSuccess(false), 5000) });

            // Simulate API call
            // await new Promise((resolve) => setTimeout(resolve, 2000));

            setSuccess(true);
            setTimeout(() => setSuccess(false), 5000);
        } catch (err) {
            console.error("Save error:", err);
            setError(err.message || "An error occurred while saving the module");
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
