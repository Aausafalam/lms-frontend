"use client";

import apiClient from "@/services/api/config";
import { courseApiService } from "@/services/api/course";
import { useCourseCreate } from "@/services/hooks/course";
import { useState, useEffect, useCallback } from "react";

/**
 * Custom hook for managing course form data and operations
 * @param {Object} params - Hook parameters
 * @param {Object} params.initialData - Initial course data
 * @returns {Object} Form state and handlers
 */
export function useCourseFormData({ initialData }) {
    // Initialize form data with new structure
    const [formData, setFormData] = useState({
        // Basic Information
        name: "",
        summary: "",
        duration: 30,
        code: "",

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

        // Certificate
        certificateCriteria: {
            certificateImage: "",
            certificateImagePreview: "",
            certificateDescription: "",
            certificateBenefits: [""],
        },

        // Features (Skills)
        features: [{ name: "", level: "" }],

        // Meta Data
        tags: [],
        difficultyLevel: [],
        categoryIds: [],
        languageCode: "English",

        // Instructors
        instructors: [],

        // Attachments
        attachments: [{ title: "", description: "", file: "" }],

        // Status
        status: "DRAFT",
        isFeatured: false,
    });

    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});
    const { courseCreate, successMessages, errorMessages } = useCourseCreate();

    // Initialize form with initial data if provided
    useEffect(() => {
        if (initialData && Object.keys(initialData).length > 0) {
            setFormData((prev) => ({
                ...prev,
                ...initialData,
                learningOutcomes: initialData.learningOutcomes?.length ? initialData.learningOutcomes : [""],
                preRequisites: initialData.preRequisites?.length ? initialData.preRequisites : [""],
                certificateCriteria: {
                    ...prev.certificateCriteria,
                    ...(initialData.certificateCriteria || {}),
                    certificateBenefits: initialData.certificateCriteria?.certificateBenefits?.length ? initialData.certificateCriteria.certificateBenefits : [""],
                },
                features: initialData.features?.length ? initialData.features : [{ name: "", level: "" }],
                attachments: initialData.attachments?.length ? initialData.attachments : [{ title: "", description: "", file: "" }],
            }));
        }
    }, [initialData]);

    // Calculate form completion progress
    useEffect(() => {
        let totalFields = 0;
        let completedFields = 0;

        // Basic fields
        const basicFields = ["name", "summary", "duration", "code"];
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

        // Certificate
        totalFields += 2;
        if (formData.certificateCriteria.certificateDescription) completedFields++;
        if (formData.certificateCriteria.certificateBenefits.some((benefit) => benefit.trim() !== "")) completedFields++;

        // Features
        totalFields += 1;
        if (formData.features.some((feature) => feature.name.trim() !== "")) completedFields++;

        // Meta data
        totalFields += 4; // tags, difficulty, categories, language
        if (formData.tags.length > 0) completedFields++;
        if (formData.difficultyLevel.length > 0) completedFields++;
        if (formData.categoryIds.length > 0) completedFields++;
        if (formData.languageCode) completedFields++;

        // Instructors
        totalFields += 1;
        if (formData.instructors.length > 0) completedFields++;

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

    // Certificate handlers
    const handleCertificateChange = useCallback((field, value) => {
        setFormData((prev) => ({
            ...prev,
            certificateCriteria: {
                ...prev.certificateCriteria,
                [field]: value,
            },
        }));
    }, []);

    const handleCertificateImageUpload = useCallback((e) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prev) => ({
                    ...prev,
                    certificateCriteria: {
                        ...prev.certificateCriteria,
                        certificateImage: file,
                        certificateImagePreview: reader.result,
                    },
                }));
            };
            reader.readAsDataURL(file);
        }
    }, []);

    const handleCertificateBenefitChange = useCallback((index, value) => {
        setFormData((prev) => {
            const updatedBenefits = [...prev.certificateCriteria.certificateBenefits];
            updatedBenefits[index] = value;
            return {
                ...prev,
                certificateCriteria: {
                    ...prev.certificateCriteria,
                    certificateBenefits: updatedBenefits,
                },
            };
        });
    }, []);

    const addCertificateBenefit = useCallback(() => {
        setFormData((prev) => ({
            ...prev,
            certificateCriteria: {
                ...prev.certificateCriteria,
                certificateBenefits: [...prev.certificateCriteria.certificateBenefits, ""],
            },
        }));
    }, []);

    const removeCertificateBenefit = useCallback((index) => {
        setFormData((prev) => {
            const updatedBenefits = [...prev.certificateCriteria.certificateBenefits];
            updatedBenefits.splice(index, 1);
            return {
                ...prev,
                certificateCriteria: {
                    ...prev.certificateCriteria,
                    certificateBenefits: updatedBenefits,
                },
            };
        });
    }, []);

    // Features (Skills) handlers
    const handleFeatureChange = useCallback((index, field, value) => {
        setFormData((prev) => {
            const updatedFeatures = [...prev.features];
            updatedFeatures[index] = {
                ...updatedFeatures[index],
                [field]: value,
            };
            return { ...prev, features: updatedFeatures };
        });
    }, []);

    const addFeature = useCallback(() => {
        setFormData((prev) => ({
            ...prev,
            features: [...prev.features, { name: "", level: "" }],
        }));
    }, []);

    const removeFeature = useCallback((index) => {
        setFormData((prev) => {
            const updatedFeatures = [...prev.features];
            updatedFeatures.splice(index, 1);
            return { ...prev, features: updatedFeatures };
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

    // Switch change handler
    const handleSwitchChange = useCallback((name, checked) => {
        setFormData((prev) => ({ ...prev, [name]: checked }));
    }, []);

    // Form validation
    const validateForm = useCallback(() => {
        const errors = {};

        // Required basic fields
        if (!formData.name?.trim()) {
            errors.name = "Course name is required";
        }
        if (!formData.code?.trim()) {
            errors.courseCode = "Course code is required";
        }
        if (!formData.summary?.trim()) {
            errors.summary = "Course summary is required";
        }
        if (!formData.duration || formData.duration < 1) {
            errors.duration = "Duration is required and must be at least 1 hour";
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
                    // if (typeof value === "object" && !Array.isArray(value)) {
                    //     formDataToSubmit.append(key, JSON.stringify(value));
                    // } else if (Array.isArray(value)) {
                    //     formDataToSubmit.append(key, JSON.stringify(value));
                    // } else {
                    formDataToSubmit.append(key, value);
                    // }
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

            let result;
            const url = formData.id ? `/api/courses/${formData.id}` : "/api/courses";
            const method = formData.id ? "PATCH" : "POST";

            // result = await fetch(url, {
            //     method,
            //     body: formDataToSubmit,
            // });

            courseApiService.create(formData);
            courseCreate.execute(
                formData,
                () => setSuccess(true),
                () => setTimeout(() => setSuccess(false), 5000)
            );
            // if (!result.ok) {
            //     const errorData = await result.json();
            //     throw new Error(errorData.message || `API error: ${result.status}`);
            // }

            // const data = await result.json();

            // setFormData((prev) => ({
            //     ...prev,
            //     id: data.id || prev.id,
            // }));

            // Clear success after 5 seconds

            // return data;
        } catch (err) {
            console.error("Save error:", err);
            setError(err.message || "An error occurred while saving the course");
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
            handleCertificateChange,
            handleCertificateImageUpload,
            handleCertificateBenefitChange,
            addCertificateBenefit,
            removeCertificateBenefit,
            handleFeatureChange,
            addFeature,
            removeFeature,
            handleAttachmentChange,
            addAttachment,
            removeAttachment,
            handleSwitchChange,
        },
        handleSave,
        setFormData,
        setError,
        setSuccess,
    };
}
