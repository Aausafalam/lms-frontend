"use client";

import { useState, useEffect } from "react";
import { useCourseCreate, useCourseUpdate } from "@/services/hooks/course";
import { useCourse } from "@/services/context/course";
import { validateCourseForm, hasValidationErrors } from "../utils/validation";
import { toast } from "@/components/ui/toast";

/**
 * Initial form data structure
 */
const getInitialFormData = () => ({
    name: "",
    summary: "",
    duration: 0,
    code: "",
    bannerImage: undefined,
    thumbnailUrl: undefined,
    promoVideoUrl: undefined,
    description: "",
    learningOutcomes: [""],
    prerequisites: [""],
    certificateCriteria: {
        certificateImage: undefined,
        certificateDescription: "",
        certificateBenefits: [""],
    },
    features: [{ name: "", level: "" }],
    tags: [],
    difficultyLevel: [],
    categoryIds: [],
    languageCode: "English",
    instructors: [],
    attachments: [{ title: "", description: "", file: "" }],
    status: "DRAFT",
    isFeatured: false,
});

/**
 * Custom hook for managing course form data and operations
 * @param {Object} params - Hook parameters
 * @param {Object} params.initialData - Initial course data
 * @returns {Object} Form state and handlers
 */
export function useCourseFormData({ initialData }) {
    const [formData, setFormData] = useState(getInitialFormData());
    const [isSaving, setIsSaving] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});

    const { courseCreate } = useCourseCreate();
    const { courseUpdate } = useCourseUpdate();
    const { courseDetails } = useCourse();

    // Initialize form with initial data
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

    // Learning outcomes handlers
    const learningOutcomeHandlers = createArrayHandlers("learningOutcomes");
    const handleLearningOutcomeChange = learningOutcomeHandlers.handleChange;
    const addLearningOutcome = learningOutcomeHandlers.add;
    const removeLearningOutcome = learningOutcomeHandlers.remove;

    // Prerequisites handlers
    const prerequisiteHandlers = createArrayHandlers("prerequisites");
    const handlePreRequisiteChange = prerequisiteHandlers.handleChange;
    const addPreRequisite = prerequisiteHandlers.add;
    const removePreRequisite = prerequisiteHandlers.remove;

    // Certificate handlers
    const handleCertificateChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            certificateCriteria: {
                ...prev.certificateCriteria,
                [field]: value,
            },
        }));
    };

    const handleCertificateImageUpload = (e) => {
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
    };

    // Certificate benefits handlers
    const certificateBenefitHandlers = createArrayHandlers("certificateCriteria.certificateBenefits");

    const handleCertificateBenefitChange = (index, value) => {
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
    };

    const addCertificateBenefit = () => {
        setFormData((prev) => ({
            ...prev,
            certificateCriteria: {
                ...prev.certificateCriteria,
                certificateBenefits: [...prev.certificateCriteria.certificateBenefits, ""],
            },
        }));
    };

    const removeCertificateBenefit = (index) => {
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
    };

    // Features handlers
    const handleFeatureChange = (index, field, value) => {
        setFormData((prev) => {
            const updatedFeatures = [...prev.features];
            updatedFeatures[index] = {
                ...updatedFeatures[index],
                [field]: value,
            };

            // Clear validation errors if features are now valid
            setValidationErrors((prevErrors) => {
                const newErrors = { ...prevErrors };
                const invalidFeature = updatedFeatures.filter((item) => item.name?.trim() || item.level?.trim()).some((f) => !f.name?.trim() || !f.level?.trim());

                if (!invalidFeature) {
                    delete newErrors.features;
                }
                delete newErrors.serverError;
                return newErrors;
            });

            return { ...prev, features: updatedFeatures };
        });
    };

    const addFeature = () => {
        setFormData((prev) => ({
            ...prev,
            features: [...prev.features, { name: "", level: "" }],
        }));
    };

    const removeFeature = (index) => {
        setFormData((prev) => {
            const updatedFeatures = [...prev.features];
            updatedFeatures.splice(index, 1);
            return { ...prev, features: updatedFeatures };
        });
    };

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
            learningOutcomes: formData.learningOutcomes.filter((item) => item.trim()),
            prerequisites: {
                prerequisites: formData.prerequisites.filter((item) => item.trim()),
            },
            features: formData.features.filter((item) => item.name?.trim() || item.level?.trim()),
            attachments: formData.attachments.filter((item) => item.title?.trim() || item.description?.trim() || item.file?.trim()),
        };

        // Validate form
        const errors = validateCourseForm(updatedPayload);
        setValidationErrors(errors);

        if (hasValidationErrors(errors)) {
            toast.error("Please fix the validation errors before saving");
            return;
        }

        delete updatedPayload.promoVideoUrl;
        setIsSaving(true);
        try {
            if (updatedPayload.id) {
                // Update existing course
                await courseUpdate.execute({
                    dynamicRoute: updatedPayload.id,
                    payload: updatedPayload,
                    onSuccess: () => {
                        toast.success("Course updated successfully!");
                        courseDetails.fetch?.({ dynamicRoute: formData.id, isLoading: false });
                    },
                    onError: (error) => {
                        const errorMessage = error?.response?.data?.message || "Failed to update course";
                        setValidationErrors({ serverError: errorMessage });
                        toast.error(errorMessage);
                    },
                });
            } else {
                // Create new course
                await courseCreate.execute({
                    payload: updatedPayload,
                    onSuccess: () => {
                        toast.success("Course created successfully!");
                    },
                    onError: (error) => {
                        const errorMessage = error?.response?.data?.message || "Failed to create course";
                        setValidationErrors({ serverError: errorMessage });
                        toast.error("Please fix the validation errors before saving");
                    },
                });
            }
        } catch (err) {
            console.error("Save error:", err);
            const errorMessage = err.message || "An error occurred while saving the course";
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
    };
}
