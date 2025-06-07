"use client";

import { useState, useEffect, useCallback } from "react";

export function useExamFormData({ initialData }) {
    const [formData, setFormData] = useState({
        // Basic Information
        examPatternName: "",
        description: "",
        durationInMinutes: 90,
        languageOptions: ["English"],

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
            enableWebcamMonitoring: false,
            enableScreenRecording: false,
            enableAIProctoring: false,
            allowedBrowsers: ["chrome", "firefox"],
            maxTabSwitches: 3,
            suspiciousActivityThreshold: 5,
            enableFullScreenMode: true,
            disableVirtualKeyboard: false,
        },

        // Scheduling & Access
        schedulingSettings: {
            enableScheduling: false,
            startDate: "",
            endDate: "",
            startTime: "",
            endTime: "",
            timeZone: "UTC",
            maxAttempts: 1,
            attemptCooldown: 0,
            enableAccessCode: false,
            accessCode: "",
            allowedUserGroups: [],
            enablePrerequisites: false,
            prerequisiteExams: [],
            enableGracePeriod: false,
            gracePeriodMinutes: 15,
            enableLateSubmission: false,
            lateSubmissionPenalty: 0,
        },

        // Attempt Rules
        attemptRules: {
            maxSectionsToAttempt: 0,
            minSectionsToAttempt: 0,
            allowSectionNavigation: true,
            allowQuestionNavigation: true,
            allowBackNavigation: true,
            autoSubmitOnTimeEnd: true,
            showUnattemptedCount: true,
        },

        // Submission Rules
        submissionRules: {
            allowManualSubmit: true,
            autoSubmitOnTimeout: true,
            confirmBeforeSubmit: true,
        },

        // Results & Analytics
        resultsSettings: {
            showResultsImmediately: false,
            showCorrectAnswers: false,
            showDetailedAnalysis: true,
            enableResultsDownload: true,
            resultDisplayFormat: "percentage",
            showRanking: false,
            showPerformanceAnalytics: true,
            enableCertificateGeneration: false,
            passingPercentage: 60,
            gradingScale: "percentage",
            showSectionWiseResults: true,
            enableResultsEmail: false,
            resultVisibilityDelay: 0,
            showTimeSpentAnalysis: true,
            enableComparisonAnalytics: false,
        },

        // Accessibility
        accessibilitySettings: {
            enableExtendedTime: false,
            extendedTimeMultiplier: 1.5,
            enableScreenReader: false,
            enableHighContrast: false,
            enableLargeText: false,
            fontSizeMultiplier: 1.2,
            enableAudioQuestions: false,
            enableTextToSpeech: false,
            enableKeyboardNavigation: true,
            enableColorBlindSupport: false,
            enableBreakTime: false,
            breakTimeMinutes: 10,
            maxBreaks: 2,
            enableSpecialInstructions: false,
            specialInstructionsText: "",
            enableAlternativeFormats: false,
            supportedFormats: [],
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
            enableAutoReminders: true,
            reminderFrequency: "daily",
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

    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});

    useEffect(() => {
        if (initialData && Object.keys(initialData).length > 0) {
            setFormData((prev) => ({
                ...prev,
                ...initialData,
                sections: initialData.sections?.length ? initialData.sections : [],
            }));
        }
    }, [initialData]);

    useEffect(() => {
        let totalFields = 0;
        let completedFields = 0;

        // Basic fields
        const basicFields = ["examPatternName", "durationInMinutes"];
        totalFields += basicFields.length;
        completedFields += basicFields.filter((field) => formData[field]).length;

        // Language options
        totalFields += 1;
        if (formData.languageOptions?.length > 0) completedFields++;

        // Sections
        totalFields += 1;
        if (formData.sections?.length > 0) completedFields++;

        const calculatedProgress = Math.round((completedFields / totalFields) * 100);
        setProgress(calculatedProgress);
    }, [formData]);

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

    const handleSwitchChange = useCallback((name, checked) => {
        setFormData((prev) => ({ ...prev, [name]: checked }));
    }, []);

    // Section management
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

    // Question group management
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

    // Attempt rules management
    const handleAttemptRuleChange = useCallback((field, value) => {
        setFormData((prev) => ({
            ...prev,
            attemptRules: {
                ...prev.attemptRules,
                [field]: value,
            },
        }));
    }, []);

    // Submission rules management
    const handleSubmissionRuleChange = useCallback((field, value) => {
        setFormData((prev) => ({
            ...prev,
            submissionRules: {
                ...prev.submissionRules,
                [field]: value,
            },
        }));
    }, []);

    // Security settings management
    const handleSecuritySettingsChange = useCallback((field, value) => {
        setFormData((prev) => ({
            ...prev,
            securitySettings: {
                ...prev.securitySettings,
                [field]: value,
            },
        }));
    }, []);

    // Scheduling settings management
    const handleSchedulingSettingsChange = useCallback((field, value) => {
        setFormData((prev) => ({
            ...prev,
            schedulingSettings: {
                ...prev.schedulingSettings,
                [field]: value,
            },
        }));
    }, []);

    // Results settings management
    const handleResultsSettingsChange = useCallback((field, value) => {
        setFormData((prev) => ({
            ...prev,
            resultsSettings: {
                ...prev.resultsSettings,
                [field]: value,
            },
        }));
    }, []);

    // Accessibility settings management
    const handleAccessibilitySettingsChange = useCallback((field, value) => {
        setFormData((prev) => ({
            ...prev,
            accessibilitySettings: {
                ...prev.accessibilitySettings,
                [field]: value,
            },
        }));
    }, []);

    // Notification settings management
    const handleNotificationSettingsChange = useCallback((field, value) => {
        setFormData((prev) => ({
            ...prev,
            notificationSettings: {
                ...prev.notificationSettings,
                [field]: value,
            },
        }));
    }, []);

    // UI config management
    const handleUIConfigChange = useCallback((field, value) => {
        setFormData((prev) => ({
            ...prev,
            uiConfig: {
                ...prev.uiConfig,
                [field]: value,
            },
        }));
    }, []);

    const validateForm = useCallback(() => {
        const errors = {};

        if (!formData.examPatternName?.trim()) {
            errors.examPatternName = "Exam name is required";
        }
        if (!formData.examCode?.trim()) {
            errors.examCode = "Exam code is required";
        }
        if (!formData.durationInMinutes || formData.durationInMinutes < 1) {
            errors.durationInMinutes = "Duration is required and must be at least 1 minute";
        }
        if (!formData.sections?.length) {
            errors.sections = "At least one section is required";
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
            // In a real app, you would make an API call here
            console.log("Saving exam data:", formData);

            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 2000));

            setSuccess(true);
            setTimeout(() => setSuccess(false), 5000);
        } catch (err) {
            console.error("Save error:", err);
            setError(err.message || "An error occurred while saving the exam");
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
            addQuestionGroup,
            removeQuestionGroup,
            handleQuestionGroupChange,
            handleAttemptRuleChange,
            handleSubmissionRuleChange,
            handleSecuritySettingsChange,
            handleSchedulingSettingsChange,
            handleResultsSettingsChange,
            handleAccessibilitySettingsChange,
            handleNotificationSettingsChange,
            handleUIConfigChange,
        },
        handleSave,
        setFormData,
        setError,
        setSuccess,
    };
}
