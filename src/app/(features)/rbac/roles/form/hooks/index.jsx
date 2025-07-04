"use client";

import { useRoleCreate, useRoleUpdate } from "@/services/hooks/roles";
import { useState, useEffect, useCallback } from "react";

export function useRoleFormData({ initialData }) {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        privileges: [],
        status: "ACTIVE",
    });

    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});
    const { roleCreate } = useRoleCreate();
    const { roleUpdate } = useRoleUpdate();
    useEffect(() => {
        if (initialData && Object.keys(initialData).length > 0) {
            setFormData((prev) => ({
                ...prev,
                ...initialData,
                privileges: initialData.privileges || [],
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

    const handlePrivilegeChange = useCallback((privileges) => {
        setFormData((prev) => ({ ...prev, privileges }));
    }, []);

    const validateForm = useCallback(() => {
        const errors = {};

        if (!formData.name?.trim()) {
            errors.name = "Role name is required";
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
            console.log("Saving role:", formData);
            if (formData.id) {
                await roleUpdate.execute({
                    dynamicRoute: formData.id,
                    payload: { ...formData, privilegeIds: formData.privileges.map((item) => item.id) },
                    onSuccess: () => setSuccess(true),
                    onError: (err) => setError(err.message || "An error occurred while saving the privilege"),
                });
            } else {
                await roleCreate.execute({
                    payload: { ...formData, privilegeIds: formData.privileges.map((item) => item.id) },
                    onSuccess: () => setSuccess(true),
                    onError: (err) => setError(err.message || "An error occurred while saving the privilege"),
                });
            }
        } catch (err) {
            console.error("Save error:", err);
            setError(err.message || "An error occurred while saving the role");
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
            handlePrivilegeChange,
        },
        handleSave,
        setFormData,
        setError,
        setSuccess,
    };
}
