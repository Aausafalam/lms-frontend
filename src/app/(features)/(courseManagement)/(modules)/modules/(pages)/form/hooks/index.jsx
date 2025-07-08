"use client";

import { useState, useEffect } from "react";
import { useModuleCreate, useModuleUpdate } from "@/services/hooks/module";
import { useModule } from "@/services/context/module";
import { validateModuleForm, hasValidationErrors } from "../utils/validation";
import { toast } from "@/components/ui/toast";
import { useQueryParams } from "@/lib/hooks/useQuery";

/**
 * Initial form data structure
 */
const getInitialFormData = () => ({
    name: "",
    summary: "",
    duration: 0,
    thumbnailUrl: undefined,
    promoVideoUrl: undefined,
    description: "",
    learningOutcomes: [""],
    prerequisites: [""],
    tags: [],
    categoryIds: [],
    instructors: [],
    attachments: [{ title: "", description: "", file: "" }],
    resources: [{ title: "", link: "" }],
    status: "DRAFT",
    isFeatured: false,
});

/**
 * Custom hook for managing module form data and operations
 * @param {Object} params - Hook parameters
 * @param {Object} params.initialData - Initial module data
 * @returns {Object} Form state and handlers
 */
export function useModuleFormData({ initialData }) {
    const [formData, setFormData] = useState(getInitialFormData());
    const [isSaving, setIsSaving] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});
    const { courseId } = useQueryParams();
    const { moduleCreate } = useModuleCreate();
    const { moduleUpdate } = useModuleUpdate();
    const { moduleDetails } = useModule();

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
                resources: initialData.resources?.length ? initialData.resources : [{ title: "", link: "" }],
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

    const handleResourceChange = (index, field, value) => {
        setFormData((prev) => {
            const updatedResources = [...prev.resources];
            updatedResources[index] = {
                ...updatedResources[index],
                [field]: value,
            };

            // Clear validation errors if attachments are now valid
            setValidationErrors((prevErrors) => {
                const newErrors = { ...prevErrors };
                const invalidResource = updatedResources.some((a) => {
                    const hasAny = a.title?.trim() || a.link?.trim();
                    const hasAll = a.title?.trim() && a.link?.trim();
                    return hasAny && !hasAll;
                });

                if (!invalidResource) {
                    delete newErrors.resources;
                }
                delete newErrors.serverError;
                return newErrors;
            });

            return { ...prev, resources: updatedResources };
        });
    };

    const addResource = () => {
        setFormData((prev) => ({
            ...prev,
            resources: [...prev.resources, { title: "", link: "" }],
        }));
    };

    const removeResource = (index) => {
        setFormData((prev) => {
            const updatedResources = [...prev.resources];
            updatedResources.splice(index, 1);
            return { ...prev, resources: updatedResources };
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
            attachments: formData.attachments.filter((item) => item.title?.trim() || item.description?.trim() || item.file?.trim()),
            resources: formData.resources.filter((item) => item.title?.trim() || item.link?.trim()),
        };

        // Validate form
        const errors = validateModuleForm(updatedPayload);
        setValidationErrors(errors);

        if (hasValidationErrors(errors)) {
            toast.error("Please fix the validation errors before saving");
            return;
        }

        delete updatedPayload.promoVideoUrl;
        setIsSaving(true);
        try {
            if (updatedPayload.id) {
                // Update existing module
                await moduleUpdate.execute({
                    dynamicRoute: `/${courseId}/module/${updatedPayload.id}`,
                    payload: updatedPayload,
                    onSuccess: () => {
                        toast.success("Module updated successfully!");
                        moduleDetails.fetch?.({ dynamicRoute: `/${courseId}/module/${formData.id}`, isLoading: false });
                    },
                    onError: (error) => {
                        const errorMessage = error?.response?.data?.message || "Failed to update module";
                        setValidationErrors({ serverError: errorMessage });
                        toast.error(errorMessage);
                    },
                });
            } else {
                // Create new module
                await moduleCreate.execute({
                    dynamicRoute: `/${courseId}/module`,
                    payload: updatedPayload,
                    onSuccess: () => {
                        toast.success("Module created successfully!");
                    },
                    onError: (error) => {
                        const errorMessage = error?.response?.data?.message || "Failed to create module";
                        setValidationErrors({ serverError: errorMessage });
                        toast.error("Please fix the validation errors before saving");
                    },
                });
            }
        } catch (err) {
            console.error("Save error:", err);
            const errorMessage = err.message || "An error occurred while saving the module";
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
            handleAttachmentChange,
            addAttachment,
            removeAttachment,
            handleSwitchChange,
            handleResourceChange,
            removeResource,
            addResource,
        },
        handleSave,
        setFormData,
    };
}
