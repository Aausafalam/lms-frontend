"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export const useUserForm = (initialData = null) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
        gender: "PREFER_NOT_TO_SAY",
        password: "",
        confirmPassword: "",
        status: "ACTIVE",
        profilePic: "",
        roles: [],
        preferences: {
            emailNotifications: true,
            pushNotifications: true,
            smsNotifications: false,
            language: "en",
            timezone: "UTC",
            theme: "light",
        },
        ...initialData,
    });

    const [activeSection, setActiveSection] = useState("basic-info");
    const [completedSections, setCompletedSections] = useState(new Set());

    useEffect(() => {
        if (initialData) {
            setFormData((prev) => ({
                ...prev,
                ...initialData,
                confirmPassword: "", // Don't populate confirm password for security
            }));
        }
    }, [initialData]);

    const validateSection = (section) => {
        const sectionErrors = {};

        switch (section) {
            case "basic-info":
                if (!formData.name.trim()) {
                    sectionErrors.name = "Name is required";
                }
                if (!formData.email.trim()) {
                    sectionErrors.email = "Email is required";
                } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
                    sectionErrors.email = "Email is invalid";
                }
                if (!formData.gender) {
                    sectionErrors.gender = "Gender is required";
                }
                break;

            case "contact":
                if (formData.mobile && !/^\+?[\d\s-()]+$/.test(formData.mobile)) {
                    sectionErrors.mobile = "Invalid mobile number format";
                }
                break;

            case "security":
                if (!initialData) {
                    // Only validate password for new users
                    if (!formData.password) {
                        sectionErrors.password = "Password is required";
                    } else if (formData.password.length < 8) {
                        sectionErrors.password = "Password must be at least 8 characters";
                    }

                    if (formData.password !== formData.confirmPassword) {
                        sectionErrors.confirmPassword = "Passwords do not match";
                    }
                }
                break;

            case "roles":
                if (formData.roles.length === 0) {
                    sectionErrors.roles = "At least one role must be assigned";
                }
                break;
        }

        return sectionErrors;
    };

    const validateForm = () => {
        const allErrors = {};
        const sections = ["basic-info", "contact", "security", "roles"];

        sections.forEach((section) => {
            const sectionErrors = validateSection(section);
            Object.assign(allErrors, sectionErrors);
        });

        setErrors(allErrors);
        return Object.keys(allErrors).length === 0;
    };

    const updateFormData = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));

        // Clear error for this field
        if (errors[field]) {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            });
        }
    };

    const updateNestedFormData = (path, value) => {
        const keys = path.split(".");
        setFormData((prev) => {
            const newData = { ...prev };
            let current = newData;

            for (let i = 0; i < keys.length - 1; i++) {
                current[keys[i]] = { ...current[keys[i]] };
                current = current[keys[i]];
            }

            current[keys[keys.length - 1]] = value;
            return newData;
        });
    };

    const handleSectionComplete = (section) => {
        const sectionErrors = validateSection(section);

        if (Object.keys(sectionErrors).length === 0) {
            setCompletedSections((prev) => new Set([...prev, section]));
            setErrors((prev) => {
                const newErrors = { ...prev };
                Object.keys(sectionErrors).forEach((key) => delete newErrors[key]);
                return newErrors;
            });
            return true;
        } else {
            setErrors((prev) => ({ ...prev, ...sectionErrors }));
            return false;
        }
    };

    const navigateToSection = (section) => {
        setActiveSection(section);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            const submitData = { ...formData };
            delete submitData.confirmPassword; // Remove confirm password before submission

            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));

            console.log("User data submitted:", submitData);

            // Navigate back to users list
            router.push("/rbac/users");
        } catch (error) {
            console.error("Error submitting user:", error);
            setErrors({ submit: "Failed to save user. Please try again." });
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        router.push("/rbac/users");
    };

    const addRole = (role) => {
        if (!formData.roles.find((r) => r.id === role.id)) {
            updateFormData("roles", [...formData.roles, role]);
        }
    };

    const removeRole = (roleId) => {
        updateFormData(
            "roles",
            formData.roles.filter((r) => r.id !== roleId)
        );
    };

    const handleProfilePicUpload = (file) => {
        // In a real app, you would upload to a file service
        const reader = new FileReader();
        reader.onload = (e) => {
            updateFormData("profilePic", e.target.result);
        };
        reader.readAsDataURL(file);
    };

    const removeProfilePic = () => {
        updateFormData("profilePic", "");
    };

    return {
        formData,
        errors,
        isLoading,
        activeSection,
        completedSections,
        updateFormData,
        updateNestedFormData,
        validateSection,
        validateForm,
        handleSectionComplete,
        navigateToSection,
        handleSubmit,
        handleCancel,
        addRole,
        removeRole,
        handleProfilePicUpload,
        removeProfilePic,
        setActiveSection,
    };
};

export const useUserRoles = () => {
    const [roles, setRoles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                // Simulate API call
                await new Promise((resolve) => setTimeout(resolve, 500));

                // Mock roles data
                const mockRoles = [
                    {
                        id: "1",
                        name: "Administrator",
                        description: "Full system access",
                        color: "red",
                        privilegeCount: 25,
                        userCount: 3,
                    },
                    {
                        id: "2",
                        name: "Manager",
                        description: "Management level access",
                        color: "blue",
                        privilegeCount: 18,
                        userCount: 8,
                    },
                    {
                        id: "3",
                        name: "Instructor",
                        description: "Course management access",
                        color: "green",
                        privilegeCount: 12,
                        userCount: 15,
                    },
                    {
                        id: "4",
                        name: "Student",
                        description: "Basic learning access",
                        color: "purple",
                        privilegeCount: 5,
                        userCount: 150,
                    },
                    {
                        id: "5",
                        name: "Content Creator",
                        description: "Content creation access",
                        color: "orange",
                        privilegeCount: 10,
                        userCount: 12,
                    },
                ];

                setRoles(mockRoles);
            } catch (error) {
                console.error("Error fetching roles:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchRoles();
    }, []);

    return { roles, isLoading };
};

export const useUserValidation = () => {
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        return {
            isValid: password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar,
            requirements: {
                minLength: password.length >= minLength,
                hasUpperCase,
                hasLowerCase,
                hasNumbers,
                hasSpecialChar,
            },
        };
    };

    const validateMobile = (mobile) => {
        const mobileRegex = /^\+?[\d\s-()]+$/;
        return mobileRegex.test(mobile);
    };

    return {
        validateEmail,
        validatePassword,
        validateMobile,
    };
};
