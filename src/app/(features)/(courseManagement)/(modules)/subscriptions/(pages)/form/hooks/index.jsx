"use client";

import { useSubscriptionCreate, useSubscriptionUpdate } from "@/services/hooks/subscription";
import { useState, useEffect, useCallback } from "react";

export function useSubscriptionFormData({ initialData }) {
    const [formData, setFormData] = useState({
        name: "",
        planType: "",
        description: "",
        price: "",
        originalPrice: "",
        currency: "INR",
        billingCycle: {
            duration: "",
            unit: "MONTH",
        },
        accessType: "",
        courses: [],
        features: [""],
        trial: {
            isTrialAvailable: false,
            trialPeriod: null,
        },
        trialPeriod: {
            // duration: 0,
            // unit: "DAY",
        },
        trialAvailable: false,
        metadata: {
            hasCertificate: false,
            isPopular: false,
            badge: "",
            tags: [],
        },
        promoCodes: [""],
        cancellation: {
            isRefundable: false,
            refundWindowDays: "",
        },
        isActive: true,
    });

    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});
    const { subscriptionCreate } = useSubscriptionCreate();
    const { subscriptionUpdate } = useSubscriptionUpdate();

    useEffect(() => {
        if (initialData && Object.keys(initialData).length > 0) {
            setFormData((prev) => ({
                ...prev,
                ...initialData,
                features: initialData.features?.length ? initialData.features : [""],
                metadata: {
                    ...prev.metadata,
                    ...initialData.metadata,
                    tags: initialData.metadata?.tags?.length ? initialData.metadata.tags : [""],
                },
                promoCodes: initialData.promoCodes?.length ? initialData.promoCodes : [""],
            }));
        }
    }, [initialData]);

    useEffect(() => {
        let totalFields = 0;
        let completedFields = 0;

        const basicFields = ["name", "planType", "description"];
        totalFields += basicFields.length;
        completedFields += basicFields.filter((field) => formData[field]).length;

        const pricingFields = ["price", "billingCycle.duration"];
        totalFields += pricingFields.length;
        if (formData.price) completedFields++;
        if (formData.billingCycle?.duration) completedFields++;

        totalFields += 1;
        if (formData.accessType) completedFields++;

        totalFields += 1;
        if (formData.courses?.length > 0) completedFields++;

        totalFields += 1;
        if (formData.features.some((feature) => feature.trim() !== "")) completedFields++;

        const calculatedProgress = Math.round((completedFields / totalFields) * 100);
        setProgress(calculatedProgress);
    }, [formData]);

    const handleInputChange = useCallback(
        (e) => {
            const { name, value } = e.target;

            // Handle nested object properties
            if (name.includes(".")) {
                const keys = name.split(".");
                setFormData((prev) => {
                    const newData = { ...prev };
                    let current = newData;
                    for (let i = 0; i < keys.length - 1; i++) {
                        if (!current[keys[i]]) current[keys[i]] = {};
                        current = current[keys[i]];
                    }
                    current[keys[keys.length - 1]] = value;
                    return newData;
                });
            } else {
                setFormData((prev) => ({ ...prev, [name]: value }));
            }

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

    const handleSwitchChange = useCallback((name, checked) => {
        // Handle nested object properties
        if (name.includes(".")) {
            const keys = name.split(".");
            setFormData((prev) => {
                const newData = { ...prev };
                let current = newData;
                for (let i = 0; i < keys.length - 1; i++) {
                    if (!current[keys[i]]) current[keys[i]] = {};
                    current = current[keys[i]];
                }
                current[keys[keys.length - 1]] = checked;
                return newData;
            });
        } else {
            setFormData((prev) => ({ ...prev, [name]: checked }));
        }
    }, []);

    const handleFeatureChange = useCallback((index, value) => {
        setFormData((prev) => {
            const updatedFeatures = [...prev.features];
            updatedFeatures[index] = value;
            return { ...prev, features: updatedFeatures };
        });
    }, []);

    const addFeature = useCallback(() => {
        setFormData((prev) => ({
            ...prev,
            features: [...prev.features, ""],
        }));
    }, []);

    const removeFeature = useCallback((index) => {
        setFormData((prev) => {
            const updatedFeatures = [...prev.features];
            updatedFeatures.splice(index, 1);
            return { ...prev, features: updatedFeatures };
        });
    }, []);

    const handleCourseChange = useCallback((courseId) => {
        setFormData((prev) => ({
            ...prev,
            courses: [...prev.courses, courseId],
        }));
    }, []);

    const addCourse = useCallback((courseId) => {
        setFormData((prev) => ({
            ...prev,
            courses: [...prev.courses, courseId],
        }));
    }, []);

    const removeCourse = useCallback((courseId) => {
        setFormData((prev) => ({
            ...prev,
            courses: prev.courses.filter((id) => id !== courseId),
        }));
    }, []);

    const handleTagChange = useCallback((index, value) => {
        setFormData((prev) => {
            const updatedTags = [...(prev.metadata?.tags || [])];
            updatedTags[index] = value;
            return {
                ...prev,
                metadata: {
                    ...prev.metadata,
                    tags: updatedTags,
                },
            };
        });
    }, []);

    const addTag = useCallback(() => {
        setFormData((prev) => ({
            ...prev,
            metadata: {
                ...prev.metadata,
                tags: [...(prev.metadata?.tags || []), ""],
            },
        }));
    }, []);

    const removeTag = useCallback((index) => {
        setFormData((prev) => {
            const updatedTags = [...(prev.metadata?.tags || [])];
            updatedTags.splice(index, 1);
            return {
                ...prev,
                metadata: {
                    ...prev.metadata,
                    tags: updatedTags,
                },
            };
        });
    }, []);

    const handlePromoChange = useCallback((index, value) => {
        setFormData((prev) => {
            const updatedPromos = [...prev.promoCodes];
            updatedPromos[index] = value;
            return { ...prev, promoCodes: updatedPromos };
        });
    }, []);

    const addPromo = useCallback(() => {
        setFormData((prev) => ({
            ...prev,
            promoCodes: [...prev.promoCodes, ""],
        }));
    }, []);

    const removePromo = useCallback((index) => {
        setFormData((prev) => {
            const updatedPromos = [...prev.promoCodes];
            updatedPromos.splice(index, 1);
            return { ...prev, promoCodes: updatedPromos };
        });
    }, []);

    const validateForm = useCallback(() => {
        const errors = {};

        if (!formData.name?.trim()) {
            errors.name = "Plan name is required";
        }
        if (!formData.planType?.trim()) {
            errors.planType = "Plan type is required";
        }
        if (!formData.description?.trim()) {
            errors.description = "Plan description is required";
        }
        if (!formData.price || formData.price <= 0) {
            errors.price = "Valid price is required";
        }
        if (!formData.billingCycle?.duration || formData.billingCycle?.duration < 1) {
            errors["billingCycle.duration"] = "Billing cycle duration is required";
        }
        if (!formData.accessType?.trim()) {
            errors.accessType = "Access type is required";
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

        const updatedFormData = { ...formData, promoCodes: formData.promoCodes.filter((item) => item) };

        setIsSaving(true);

        try {
            if (formData.id) {
                subscriptionUpdate.execute({
                    dynamicRoute: `/${formData.id}`,
                    payload: updatedFormData,
                    onSuccess: () => {
                        setSuccess(true);
                        setTimeout(() => setSuccess(false), 5000);
                    },
                    onError: (error) => {
                        setError(error.message || "Failed to save subscription");
                        setTimeout(() => setError(null), 5000);
                    },
                });
            } else {
                subscriptionCreate.execute({
                    dynamicRoute: ``,
                    payload: updatedFormData,
                    onSuccess: () => {
                        setSuccess(true);
                        setTimeout(() => setSuccess(false), 5000);
                    },
                    onError: (error) => {
                        setError(error.message || "Failed to save subscription");
                        setTimeout(() => setError(null), 5000);
                    },
                });
            }
        } catch (err) {
            console.error("Save error:", err);
            setError(err.message || "An error occurred while saving the subscription plan");
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
            handleSwitchChange,
            handleFeatureChange,
            addFeature,
            removeFeature,
            handleCourseChange,
            addCourse,
            removeCourse,
            handleTagChange,
            addTag,
            removeTag,
            handlePromoChange,
            addPromo,
            removePromo,
        },
        handleSave,
        setFormData,
        setError,
        setSuccess,
    };
}
