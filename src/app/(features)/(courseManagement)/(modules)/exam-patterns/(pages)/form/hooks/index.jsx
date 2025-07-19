"use client";

import { useState, useEffect, useCallback } from "react";
import { useExamPatternCreate, useExamPatternUpdate } from "@/services/hooks/exam-pattern";
import { useExamPattern } from "@/services/context/exam-pattern";
import { validateExamPatternForm, hasValidationErrors } from "../utils/validation";
import { toast } from "@/components/ui/toast";
import { useQueryParams } from "@/lib/hooks/useQuery";

/**
 * Initial form data structure
 */
const getInitialFormData = () => ({
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
    status: "DRAFT",
    isFeatured: false,
});

/**
 * Custom hook for managing examPattern form data and operations
 * @param {Object} params - Hook parameters
 * @param {Object} params.initialData - Initial examPattern data
 * @returns {Object} Form state and handlers
 */
export function useExamPatternFormData({ initialData, onExamPage }) {
    const [formData, setFormData] = useState(getInitialFormData());
    const [isSaving, setIsSaving] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});
    const { courseId } = useQueryParams();
    const { examPatternCreate } = useExamPatternCreate();
    const { examPatternUpdate } = useExamPatternUpdate();
    const { examPatternDetails } = useExamPattern();

    // Initialize form with initial data
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
        onExamPage && onExamPage?.({ target: { name: "examPattern", value: formData } });
    }, [formData]);

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

        // Clear validation errors for this field
        if (validationErrors[`section_${sectionIndex}_${field}`] || validationErrors?.serverError) {
            setValidationErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors.serverError;
                delete newErrors[`section_${sectionIndex}_${field}`];
                return newErrors;
            });
        }
    }, []);

    const addSection = useCallback((newSection) => {
        setFormData((prev) => ({
            ...prev,
            sections: [...prev.sections, newSection],
        }));

        // Clear validation errors for this field
        if (validationErrors?.["sections"]) {
            setValidationErrors((prev) => {
                delete newErrors["sections"];
                return newErrors;
            });
        }
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

    // Switch change handler
    const handleSwitchChange = (name, checked) => {
        setFormData((prev) => ({ ...prev, [name]: checked }));
    };

    // Save handler
    const handleSave = async () => {
        // Prepare payload
        const updatedPayload = {
            ...formData,
        };

        // Validate form
        const errors = validateExamPatternForm(updatedPayload);
        setValidationErrors(errors);

        if (hasValidationErrors(errors)) {
            toast.error("Please fix the validation errors before saving");
            return;
        }

        delete updatedPayload.promoVideoUrl;
        setIsSaving(true);
        try {
            if (updatedPayload.id) {
                // Update existing examPattern
                await examPatternUpdate.execute({
                    dynamicRoute: `/${courseId}/exam-pattern/${updatedPayload.id}`,
                    payload: updatedPayload,
                    onSuccess: () => {
                        toast.success("Exam Pattern updated successfully!");
                        examPatternDetails.fetch?.({ dynamicRoute: `/${courseId}/exam-pattern/${formData.id}`, isLoading: false });
                    },
                    onError: (error) => {
                        const errorMessage = error?.response?.data?.message || "Failed to update exam pattern";
                        setValidationErrors({ serverError: errorMessage });
                        toast.error(errorMessage);
                    },
                });
            } else {
                // Create new examPattern
                await examPatternCreate.execute({
                    dynamicRoute: `/${courseId}/exam-pattern`,
                    payload: updatedPayload,
                    onSuccess: () => {
                        toast.success("ExamPattern created successfully!");
                    },
                    onError: (error) => {
                        const errorMessage = error?.response?.data?.message || "Failed to create exam pattern";
                        setValidationErrors({ serverError: errorMessage });
                        toast.error("Please fix the validation errors before saving");
                    },
                });
            }
        } catch (err) {
            console.error("Save error:", err);
            const errorMessage = err.message || "An error occurred while saving the examPattern";
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
    };
}
