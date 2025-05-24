"use client";

import { useState, useEffect, useCallback } from "react";

export function useModuleFormData({ initialData }) {
    const [formData, setFormData] = useState({
        id: null,
        title: "",
        shortDescription: "",
        longDescription: "<p>Enter detailed description here...</p>",
        publishedAt: new Date(),
        instructors: [],
        bannerImage: null,
        bannerImagePreview: "",
        modulePosition: 1,
        introVideo: "",
        estimatedDuration: 30,
        difficulty: ["intermediate"],
        categories: [],
        preRequisites: [""],
        learningObjectives: [""],
        resources: [{ title: "", url: "" }],
        quizQuestions: [],
        tags: [],
        isPublished: false,
        isFeatured: false,
    });

    const courseForm = {
        title: "",
        shortDescription: "",
        longDescription: "<p>Enter detailed description here...</p>",
        publishedAt: new Date(),
        instructors: ["werwe"],
        bannerImage: null,
        introVideo: "",
        estimatedDuration: 30,
        preRequisites: [""],
        learningObjectives: [""],
        price: {
            regularPrice: "99.99",
            salePrice: "79.99",
            discountPercentage: "20",
            saleEndDate: "2023-12-31",
            saleEndsText: "Limited time offer!",
        },
        certificate: {
            certificateImage: "https://example.com/certificate.png",
            certificateDescription: "This is a sample certificate description.",
            certificateBenefits: ["Benefit 1", "Benefit 2", "Benefit 3"],
        },
        skills: [
            {
                name: "React.js",
                level: "Advanced",
            },
            {
                name: "JavaScript",
                level: "Advanced",
            },
        ],
    };

    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState(null);

    // Initialize form with initial data if provided
    useEffect(() => {
        if (initialData) {
            setFormData((prev) => ({
                ...prev,
                ...initialData,
                id: initialData.id || null,
                publishedAt: initialData.publishedAt ? new Date(initialData.publishedAt) : new Date(),
                instructors: initialData.instructors || [],
                categories: initialData.categories || [],
                tags: initialData.tags || [],
                learningObjectives: initialData.learningObjectives?.length ? initialData.learningObjectives : [""],
                resources: initialData.resources?.length ? initialData.resources : [{ title: "", url: "" }],
                completionCriteria: {
                    ...prev.completionCriteria,
                    ...(initialData.completionCriteria || {}),
                },
                previewDevices: initialData.previewDevices || ["desktop", "mobile", "tablet"],
            }));
        }
    }, [initialData]);

    // Calculate form completion progress
    useEffect(() => {
        let totalFields = 0;
        let completedFields = 0;

        // Basic fields
        const basicFields = ["title", "shortDescription", "publishedAt", "estimatedDuration", "difficulty"];
        totalFields += basicFields.length;
        completedFields += basicFields.filter((field) => formData[field]).length;

        // Media fields
        totalFields += 2; // Banner image and intro video
        if (formData.bannerImagePreview) completedFields++;
        if (formData.introVideo) completedFields++;

        // Content fields
        totalFields += 1; // Long description
        if (formData.longDescription && formData.longDescription !== "<p>Enter detailed description here...</p>") completedFields++;

        // Learning objectives
        totalFields += 1;
        if (formData.learningObjectives.some((obj) => obj.trim() !== "")) completedFields++;

        // Resources
        totalFields += 1;
        if (formData.resources.some((res) => res.title.trim() !== "" && res.url.trim() !== "")) completedFields++;

        // Settings
        totalFields += 3; // Instructors, categories, tags
        if (formData.instructors.length > 0) completedFields++;
        if (formData.categories.length > 0) completedFields++;
        if (formData.tags.length > 0) completedFields++;

        const calculatedProgress = Math.round((completedFields / totalFields) * 100);
        setProgress(calculatedProgress);
    }, [formData]);

    // Form field handlers - using direct setFormData to avoid cursor jumping issues
    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }, []);

    const handleImageUpload = useCallback((e) => {
        const file = e.target.value;
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prev) => ({
                    ...prev,
                    bannerImage: file,
                    bannerImagePreview: reader.result,
                }));
            };
            reader.readAsDataURL(file);
        }
    }, []);

    const handleLearningObjectiveChange = useCallback((index, value) => {
        setFormData((prev) => {
            const updatedObjectives = [...prev.learningObjectives];
            updatedObjectives[index] = value;
            return { ...prev, learningObjectives: updatedObjectives };
        });
    }, []);

    const addLearningObjective = useCallback(() => {
        setFormData((prev) => ({
            ...prev,
            learningObjectives: [...prev.learningObjectives, ""],
        }));
    }, []);

    const removeLearningObjective = useCallback((index) => {
        setFormData((prev) => {
            const updatedObjectives = [...prev.learningObjectives];
            updatedObjectives.splice(index, 1);
            return { ...prev, learningObjectives: updatedObjectives };
        });
    }, []);

    const handlePreRequisiteChange = useCallback((index, value) => {
        setFormData((prev) => {
            const updatedObjectives = [...prev.preRequisites];
            updatedObjectives[index] = value;
            return { ...prev, preRequisites: updatedObjectives };
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
            const updatedObjectives = [...prev.preRequisites];
            updatedObjectives.splice(index, 1);
            return { ...prev, preRequisites: updatedObjectives };
        });
    }, []);

    const handleResourceChange = useCallback((index, event) => {
        const { name, value } = event.target;
        setFormData((prev) => {
            const updatedResources = [...prev.resources];
            updatedResources[index] = { ...updatedResources[index], [name]: value };
            return { ...prev, resources: updatedResources };
        });
    }, []);

    const addResource = useCallback(() => {
        setFormData((prev) => ({
            ...prev,
            resources: [...prev.resources, { title: "", url: "" }],
        }));
    }, []);

    const removeResource = useCallback((index) => {
        setFormData((prev) => {
            const updatedResources = [...prev.resources];
            updatedResources.splice(index, 1);
            return { ...prev, resources: updatedResources };
        });
    }, []);

    const handleSwitchChange = useCallback((name, checked) => {
        console.log(name, checked);
        setFormData((prev) => ({ ...prev, [name]: checked }));
    }, []);

    const handleCompletionCriteriaChange = useCallback((field, value) => {
        setFormData((prev) => ({
            ...prev,
            completionCriteria: {
                ...prev.completionCriteria,
                [field]: value,
            },
        }));
    }, []);

    const handlePreviewDeviceToggle = useCallback((device) => {
        setFormData((prev) => {
            const devices = [...prev.previewDevices];
            const index = devices.indexOf(device);

            if (index === -1) {
                devices.push(device);
            } else {
                devices.splice(index, 1);
            }

            return {
                ...prev,
                previewDevices: devices,
            };
        });
    }, []);

    const handleSliderChange = useCallback((field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value[0] }));
    }, []);

    const handleSave = useCallback(async () => {
        setIsSaving(true);
        setError(null);

        try {
            // Prepare form data for API
            const formDataToSubmit = {
                ...formData,
                // Convert any special types or handle file uploads here if needed
            };

            let result;

            // If we have an ID, it's an update (PATCH)
            if (formData.id) {
                result = await fetch(`/api/modules/${formData.id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formDataToSubmit),
                });
            } else {
                // Otherwise it's a new module (POST)
                result = await fetch("/api/modules", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formDataToSubmit),
                });
            }

            if (!result.ok) {
                throw new Error(`API error: ${result.status}`);
            }

            const data = await result.json();

            // Update the form with the returned data (including any server-generated IDs)
            setFormData((prev) => ({
                ...prev,
                id: data.id || prev.id,
            }));

            // Call the onSubmit callback if provided
            // if (onSubmit) {
            //     onSubmit(data);
            // }

            return data;
        } catch (err) {
            setError(err.message || "An error occurred while saving");
            throw err;
        } finally {
            setIsSaving(false);
        }
    }, [formData]);

    return {
        formData,
        progress,
        isLoading,
        isSaving,
        error,
        handlers: {
            handleInputChange,
            handleImageUpload,
            handleLearningObjectiveChange,
            addLearningObjective,
            removeLearningObjective,
            handlePreRequisiteChange,
            addPreRequisite,
            removePreRequisite,
            handleResourceChange,
            addResource,
            removeResource,
            handleSwitchChange,
            handleCompletionCriteriaChange,
            handlePreviewDeviceToggle,
            handleSliderChange,
        },
        handleSave,
        setFormData,
    };
}
