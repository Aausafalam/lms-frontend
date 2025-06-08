"use client";

import { useQueryParams } from "@/lib/hooks/useQuery";
import { useExamPatternCreate } from "@/services/hooks/exam-pattern";
import { useState, useEffect, useCallback } from "react";

/**
 * Custom hook for managing exam form data and operations
 * Handles form state, validation, section management, and drag-and-drop functionality
 */
export function useExamFormData({ initialData }) {
    const [formData, setFormData] = useState({
        // Basic Information
        name: "",
        description: "",

        // Global Settings
        shuffleQuestions: true,
        shuffleSections: false,
        globalMarkingPolicy: {
            defaultCorrectMark: 1,
            defaultNegativeMark: 0.33,
        },

        // Sections
        sections: [],

        // Security & Proctoring
        securitySettings: {
            enableBrowserLockdown: false,
            disableRightClick: true,
            disableCopyPaste: true,
            preventTabSwitching: true,
            enableAIProctoring: false,
            allowedBrowsers: ["chrome", "firefox"],
            maxTabSwitches: 3,
            suspiciousActivityThreshold: 5,
            enableFullScreenMode: true,
            disableVirtualKeyboard: false,
        },

        // Access control
        accessControlSettings: {
            maxAttempts: 1,
            enableAccessCode: false,
            accessCode: "",
            allowedUserGroups: [],
        },

        // Attempt Rules
        attemptRules: {
            maxSectionsToAttempt: 0,
            minSectionsToAttempt: 0,
            allowSectionNavigation: true,
            allowQuestionNavigation: true,
            allowBackNavigation: true,
        },

        // Results & Analytics
        resultsSettings: {
            showResultsImmediately: false,
            showCorrectAnswers: false,
            showDetailedAnalysis: true,
            enableResultsDownload: true,
            showRanking: false,
            showPerformanceAnalytics: true,
            enableCertificateGeneration: false,
            passingPercentage: 60,
            enableResultsEmail: false,
            resultVisibilityDelay: 0,
        },

        // Notifications
        notificationSettings: {
            enableEmailNotifications: true,
            enableSMSNotifications: false,
            enablePushNotifications: true,
            sendExamReminders: true,
            reminderIntervals: [24, 1],
            sendResultNotifications: true,
            sendStartNotifications: true,
            sendSubmissionConfirmation: true,
            customEmailTemplate: false,
            emailSubjectTemplate: "",
            emailBodyTemplate: "",
            notifyInstructors: true,
            notifyAdmins: false,
        },

        // UI Configuration
        uiConfig: {
            theme: "default",
            fontSize: "medium",
            showTimer: true,
            languageSelector: true,
            accessibleMode: false,
        },

        // Status
        status: "DRAFT",
    });

    const { courseId } = useQueryParams();
    const { examPatternCreate } = useExamPatternCreate();
    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});

    /**
     * Initialize form data with provided initial data
     */
    useEffect(() => {
        if (initialData && Object.keys(initialData).length > 0) {
            setFormData((prev) => ({
                ...prev,
                ...initialData,
                sections: initialData.sections?.length ? initialData.sections : [],
            }));
        }
    }, [initialData]);

    /**
     * Calculate form completion progress
     */
    useEffect(() => {
        let totalFields = 0;
        let completedFields = 0;

        // Basic fields
        const basicFields = ["name", "description"];
        totalFields += basicFields.length;
        completedFields += basicFields.filter((field) => formData[field]).length;

        // Sections
        totalFields += 1;
        if (formData.sections?.length > 0) completedFields++;

        const calculatedProgress = Math.round((completedFields / totalFields) * 100);
        setProgress(calculatedProgress);
    }, [formData]);

    /**
     * Handle basic input changes with validation cleanup
     */
    const handleInputChange = useCallback(
        (e) => {
            const { name, value } = e.target;
            setFormData((prev) => ({ ...prev, [name]: value }));

            // Clear validation errors for the field
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

    /**
     * Handle switch/toggle changes
     */
    const handleSwitchChange = useCallback((name, checked) => {
        setFormData((prev) => ({ ...prev, [name]: checked }));
    }, []);

    // Section management functions
    const handleSectionChange = useCallback((sectionIndex, field, value) => {
        setFormData((prev) => {
            const updatedSections = [...prev.sections];
            updatedSections[sectionIndex] = {
                ...updatedSections[sectionIndex],
                [field]: value,
            };
            return { ...prev, sections: updatedSections };
        });
    }, []);

    const addSection = useCallback((newSection) => {
        setFormData((prev) => ({
            ...prev,
            sections: [...prev.sections, newSection],
        }));
    }, []);

    const removeSection = useCallback((sectionIndex) => {
        setFormData((prev) => {
            const updatedSections = [...prev.sections];
            updatedSections.splice(sectionIndex, 1);
            return { ...prev, sections: updatedSections };
        });
    }, []);

    /**
     * Move section up in the order
     */
    const moveSectionUp = useCallback((sectionIndex) => {
        if (sectionIndex > 0) {
            setFormData((prev) => {
                const updatedSections = [...prev.sections];
                const temp = updatedSections[sectionIndex];
                updatedSections[sectionIndex] = updatedSections[sectionIndex - 1];
                updatedSections[sectionIndex - 1] = temp;
                return { ...prev, sections: updatedSections };
            });
        }
    }, []);

    /**
     * Move section down in the order
     */
    const moveSectionDown = useCallback((sectionIndex) => {
        setFormData((prev) => {
            if (sectionIndex < prev.sections.length - 1) {
                const updatedSections = [...prev.sections];
                const temp = updatedSections[sectionIndex];
                updatedSections[sectionIndex] = updatedSections[sectionIndex + 1];
                updatedSections[sectionIndex + 1] = temp;
                return { ...prev, sections: updatedSections };
            }
            return prev;
        });
    }, []);

    // Question group management functions
    const addQuestionGroup = useCallback((sectionIndex) => {
        setFormData((prev) => {
            const updatedSections = [...prev.sections];
            const section = updatedSections[sectionIndex];
            const newGroup = {
                range: [1, 10],
                marksPerQuestion: 1,
                negativeMarks: 0.33,
                questionType: "MCQ",
            };

            updatedSections[sectionIndex] = {
                ...section,
                questionGroups: [...(section.questionGroups || []), newGroup],
            };
            return { ...prev, sections: updatedSections };
        });
    }, []);

    const removeQuestionGroup = useCallback((sectionIndex, groupIndex) => {
        setFormData((prev) => {
            const updatedSections = [...prev.sections];
            const section = updatedSections[sectionIndex];
            const updatedGroups = [...(section.questionGroups || [])];
            updatedGroups.splice(groupIndex, 1);

            updatedSections[sectionIndex] = {
                ...section,
                questionGroups: updatedGroups,
            };
            return { ...prev, sections: updatedSections };
        });
    }, []);

    const handleQuestionGroupChange = useCallback((sectionIndex, groupIndex, field, value) => {
        setFormData((prev) => {
            const updatedSections = [...prev.sections];
            const section = updatedSections[sectionIndex];
            const updatedGroups = [...(section.questionGroups || [])];

            updatedGroups[groupIndex] = {
                ...updatedGroups[groupIndex],
                [field]: value,
            };

            updatedSections[sectionIndex] = {
                ...section,
                questionGroups: updatedGroups,
            };
            return { ...prev, sections: updatedSections };
        });
    }, []);

    /**
     * Move question group up within a section
     */
    const moveQuestionGroupUp = useCallback((sectionIndex, groupIndex) => {
        if (groupIndex > 0) {
            setFormData((prev) => {
                const updatedSections = [...prev.sections];
                const section = updatedSections[sectionIndex];
                const updatedGroups = [...(section.questionGroups || [])];

                const temp = updatedGroups[groupIndex];
                updatedGroups[groupIndex] = updatedGroups[groupIndex - 1];
                updatedGroups[groupIndex - 1] = temp;

                updatedSections[sectionIndex] = {
                    ...section,
                    questionGroups: updatedGroups,
                };
                return { ...prev, sections: updatedSections };
            });
        }
    }, []);

    /**
     * Move question group down within a section
     */
    const moveQuestionGroupDown = useCallback((sectionIndex, groupIndex) => {
        setFormData((prev) => {
            const section = prev.sections[sectionIndex];
            const questionGroups = section.questionGroups || [];

            if (groupIndex < questionGroups.length - 1) {
                const updatedSections = [...prev.sections];
                const updatedGroups = [...questionGroups];

                const temp = updatedGroups[groupIndex];
                updatedGroups[groupIndex] = updatedGroups[groupIndex + 1];
                updatedGroups[groupIndex + 1] = temp;

                updatedSections[sectionIndex] = {
                    ...section,
                    questionGroups: updatedGroups,
                };
                return { ...prev, sections: updatedSections };
            }
            return prev;
        });
    }, []);

    // Settings management functions
    const handleAttemptRuleChange = useCallback((field, value) => {
        setFormData((prev) => ({
            ...prev,
            attemptRules: {
                ...prev.attemptRules,
                [field]: value,
            },
        }));
    }, []);

    const handleSecuritySettingsChange = useCallback((field, value) => {
        setFormData((prev) => ({
            ...prev,
            securitySettings: {
                ...prev.securitySettings,
                [field]: value,
            },
        }));
    }, []);

    const handleAccessControlSettingsChange = useCallback((field, value) => {
        setFormData((prev) => ({
            ...prev,
            accessControlSettings: {
                ...prev.accessControlSettings,
                [field]: value,
            },
        }));
    }, []);

    const handleResultsSettingsChange = useCallback((field, value) => {
        setFormData((prev) => ({
            ...prev,
            resultsSettings: {
                ...prev.resultsSettings,
                [field]: value,
            },
        }));
    }, []);

    const handleNotificationSettingsChange = useCallback((field, value) => {
        setFormData((prev) => ({
            ...prev,
            notificationSettings: {
                ...prev.notificationSettings,
                [field]: value,
            },
        }));
    }, []);

    const handleUIConfigChange = useCallback((field, value) => {
        setFormData((prev) => ({
            ...prev,
            uiConfig: {
                ...prev.uiConfig,
                [field]: value,
            },
        }));
    }, []);

    /**
     * Validate form data before saving
     */
    const validateForm = useCallback(() => {
        const errors = {};

        if (!formData.name?.trim()) {
            errors.name = "Exam pattern name is required";
        }
        if (!formData.description?.trim()) {
            errors.description = "Description is required";
        }
        if (!formData.sections?.length) {
            errors.sections = "At least one section is required";
        }

        // Validate sections
        formData.sections?.forEach((section, index) => {
            if (!section.name?.trim()) {
                errors[`section_${index}_name`] = `Section ${index + 1} name is required`;
            }
            if (!section.questionsCount || section.questionsCount < 1) {
                errors[`section_${index}_questions`] = `Section ${index + 1} must have at least 1 question`;
            }
            if (!section.questionsToAttempt || section.questionsToAttempt < 1) {
                errors[`section_${index}_attempt`] = `Section ${index + 1} must have at least 1 question to attempt`;
            }
            if (section.questionsToAttempt > section.questionsCount) {
                errors[`section_${index}_attempt_exceed`] = `Section ${index + 1} cannot have more questions to attempt than total questions`;
            }
        });

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    }, [formData]);

    /**
     * Save form data
     */
    const handleSave = useCallback(async () => {
        setError(null);
        setSuccess(false);

        if (!validateForm()) {
            setError("Please fix the validation errors before saving");
            return;
        }

        setIsSaving(true);

        try {
            // In a real app, you would make an API call here
            console.log("Saving exam pattern data:", formData);
            examPatternCreate.execute({ dynamicRoute: `/${courseId}/exam-pattern`, payload: formData, onSuccess: () => setSuccess(true), onError: () => setTimeout(() => setSuccess(false), 5000) });
            // Simulate API call
            // await new Promise((resolve) => setTimeout(resolve, 2000));
        } catch (err) {
            console.error("Save error:", err);
            setError(err.message || "An error occurred while saving the exam pattern");
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
            handleSwitchChange,
            handleSectionChange,
            addSection,
            removeSection,
            moveSectionUp,
            moveSectionDown,
            addQuestionGroup,
            removeQuestionGroup,
            handleQuestionGroupChange,
            moveQuestionGroupUp,
            moveQuestionGroupDown,
            handleAttemptRuleChange,
            handleSecuritySettingsChange,
            handleAccessControlSettingsChange,
            handleResultsSettingsChange,
            handleNotificationSettingsChange,
            handleUIConfigChange,
        },
        handleSave,
        setFormData,
        setError,
        setSuccess,
    };
}
