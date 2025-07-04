"use client";

import { useState, useEffect, useCallback } from "react";

export function useUserForm(initialData) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
        gender: "PREFER_NOT_TO_SAY",
        status: "ACTIVE",
        profilePic: "",
        password: "",
        confirmPassword: "",
        roles: [],
        requirePasswordChange: false,
        enableTwoFactor: false,
        accountLockout: false,
        language: "en",
        timezone: "UTC",
        theme: "light",
        emailNotifications: true,
        pushNotifications: false,
        smsNotifications: false,
        isActive: true,
    });

    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});

    useEffect(() => {
        if (initialData && Object.keys(initialData || {}).length > 0) {
            setFormData((prev) => ({
                ...prev,
                ...initialData,
                roles: initialData.roles || [],
            }));
        }
    }, [initialData]);

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

    const addRole = useCallback((role) => {
        setFormData((prev) => ({
            ...prev,
            roles: [...prev.roles, role],
        }));
    }, []);

    const removeRole = useCallback((index) => {
        setFormData((prev) => ({
            ...prev,
            roles: prev.roles.filter((_, i) => i !== index),
        }));
    }, []);

    const validateForm = useCallback(() => {
        const errors = {};

        if (!formData.name?.trim()) {
            errors.name = "User name is required";
        }
        if (!formData.email?.trim()) {
            errors.email = "Email address is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = "Please enter a valid email address";
        }
        if (!formData.status?.trim()) {
            errors.status = "User status is required";
        }
        if (!formData.roles?.length) {
            errors.roles = "At least one role must be assigned";
        }
        if (!formData.password?.trim()) {
            errors.password = "Password is required";
        } else if (formData.password.length < 8) {
            errors.password = "Password must be at least 8 characters long";
        }
        if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = "Passwords do not match";
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
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));

            console.log("Saving user:", formData);
            setSuccess(true);
            setTimeout(() => setSuccess(false), 5000);
        } catch (err) {
            console.error("Save error:", err);
            setError(err.message || "An error occurred while saving the user");
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
            addRole,
            removeRole,
        },
        handleSave,
        setFormData,
        setError,
        setSuccess,
    };
}
