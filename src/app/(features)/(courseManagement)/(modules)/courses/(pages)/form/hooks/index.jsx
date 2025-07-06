"use client";

import apiClient from "@/services/api/config";
import { useCourse } from "@/services/context/course";
import { useCourseCreate, useCourseUpdate } from "@/services/hooks/course";
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
        duration: 0,
        code: "",

        // Media
        bannerImage: undefined,
        thumbnailUrl: undefined,
        promoVideoUrl: undefined,

        // Content
        description: "",

        // Learning Outcomes
        learningOutcomes: [""],

        // Prerequisites
        prerequisites: [""],

        // Certificate
        certificateCriteria: {
            certificateImage: undefined,
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

    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});
    const { courseCreate } = useCourseCreate();
    const { courseUpdate } = useCourseUpdate();
    const { courseDetails } = useCourse();

    // Initialize form with initial data if provided
    useEffect(() => {
        if (initialData && Object.keys(initialData).length > 0) {
            setFormData((prev) => ({
                ...prev,
                ...initialData,
                learningOutcomes: initialData.learningOutcomes?.length ? initialData.learningOutcomes : [""],
                prerequisites: initialData.prerequisites?.length ? initialData.prerequisites : [""],
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

    // Generic input change handler
    const handleInputChange = useCallback(
        (e) => {
            const { name, value } = e.target;
            setFormData((prev) => ({ ...prev, [name]: value }));

            // Clear validation error for this field
            if (validationErrors[name] || validationErrors?.["serverError"]) {
                setValidationErrors((prev) => {
                    const newErrors = { ...prev };
                    delete newErrors?.["serverError"];
                    delete newErrors[name];
                    return newErrors;
                });
            }
        },
        [validationErrors]
    );

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
            const updatedPreRequisites = [...prev.prerequisites];
            updatedPreRequisites[index] = value;
            return { ...prev, prerequisites: updatedPreRequisites };
        });
    }, []);

    const addPreRequisite = useCallback(() => {
        setFormData((prev) => ({
            ...prev,
            prerequisites: [...prev.prerequisites, ""],
        }));
    }, []);

    const removePreRequisite = useCallback((index) => {
        setFormData((prev) => {
            const updatedPreRequisites = [...prev.prerequisites];
            updatedPreRequisites.splice(index, 1);
            return { ...prev, prerequisites: updatedPreRequisites };
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

            setValidationErrors((prevErrors) => {
                const newErrors = { ...prevErrors };

                const invalidFeature = updatedFeatures.filter((item) => item.name?.trim() || item.level?.trim()).some((f) => !f.name?.trim() || !f.level?.trim());

                if (!invalidFeature) {
                    delete newErrors.features;
                }
                delete newErrors?.["serverError"];
                return newErrors;
            });

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
                delete newErrors?.["serverError"];
                return newErrors;
            });

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
    const validateForm = useCallback(
        (formData) => {
            const errors = {};

            // Required basic fields
            if (!formData.name?.trim()) {
                errors.name = "Course name is required";
            }

            if (!formData.code?.trim()) {
                errors.code = "Course code is required";
            }

            if (!formData.summary?.trim()) {
                errors.summary = "Course summary is required";
            }

            if (!formData.duration || formData.duration < 1) {
                errors.duration = "Duration is required and must be at least 1 hour";
            }

            if (!formData.id) {
                if (!formData.bannerImage?.fileId?.trim()) {
                    errors.bannerImage = "Banner Image is required.";
                }

                if (!formData.thumbnailUrl?.fileId?.trim()) {
                    errors.thumbnailUrl = "Thumbnail is required.";
                }
            }

            if (!formData.description?.trim()) {
                errors.description = "Description is required.";
            }

            if (!Array.isArray(formData.difficultyLevel) || formData.difficultyLevel.length === 0) {
                errors.difficultyLevel = "At least one difficulty level is required.";
            }

            if (!Array.isArray(formData.instructorIds) || formData.instructorIds.length === 0) {
                errors.instructorIds = "At least one instructor is required.";
            }

            if (!Array.isArray(formData.categoryIds) || formData.categoryIds.length === 0) {
                errors.categoryIds = "At least one category is required.";
            }

            // Validate features
            if (Array.isArray(formData?.features)) {
                const invalidFeature = formData.features.some((f) => !f.name?.trim() || !f.level?.trim());
                if (invalidFeature) {
                    errors.features = "Each skill must have both name and level.";
                }
            }

            // Validate attachments
            if (Array.isArray(formData.attachments)) {
                const invalidAttachment = formData.attachments.some((a) => !a.title?.trim() || !a.description?.trim() || !a.file?.trim());
                if (invalidAttachment) {
                    errors.attachments = "Each attachment must have title, description, and file.";
                }
            }

            setValidationErrors(errors);
            return Object.keys(errors).length === 0;
        },
        [formData]
    );

    // Save handler
    const handleSave = useCallback(async () => {
        setError(null);
        setSuccess(false);
        const updatedPayload = {
            ...formData,
            learningOutcomes: formData.learningOutcomes.filter((item) => item),
            prerequisites: { prerequisites: formData.prerequisites.filter((item) => item) },
            features: formData.features.filter((item) => item.name || item.level),
            attachments: formData.attachments.filter((item) => item.title || item.description || item.file),
        };
        console.log(updatedPayload);
        // Validate form
        if (!validateForm(updatedPayload)) {
            setError("Please fix the validation errors before saving");
            return;
        }
        console.log(updatedPayload);

        setIsSaving(true);
        delete updatedPayload?.promoVideoUrl;
        try {
            if (updatedPayload.id) {
                courseUpdate.execute({
                    dynamicRoute: updatedPayload.id,
                    payload: updatedPayload,
                    onSuccess: () => {
                        setSuccess(true);
                        courseDetails.fetch?.({ dynamicRoute: formData.id, isLoading: false });
                    },
                    onError: () => setSuccess(false),
                });
            } else {
                courseCreate.execute({
                    payload: updatedPayload,
                    onSuccess: () => setSuccess(true),
                    onError: (error) => {
                        setValidationErrors({ serverError: error.response.data.message });
                        setError("Please fix the validation errors before saving");
                    },
                });
            }
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
        isLoading,
        isSaving,
        error,
        success,
        validationErrors,
        handlers: {
            handleInputChange,
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
