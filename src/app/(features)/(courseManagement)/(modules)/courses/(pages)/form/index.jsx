"use client";
import { useEffect, useRef, useState } from "react";
import CourseFormHeader from "./components/header";
import { Button } from "@/components/ui/button";
import { Loader2, Sparkles, AlertCircle } from "lucide-react";
import { SidebarNavigation } from "./components/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FormSections } from "./components/form-sections";
import GlobalUtils from "@/lib/utils";
import { useCourseFormData } from "./hooks";
import { CoursePreview } from "./components/preview";
import { ToastContainer } from "@/components/ui/toast";

/**
 * Course Form Base Component
 * Main container for the course creation/editing form with enhanced error handling
 *
 * @param {Object} props - Component props
 * @param {Object} props.initialData - Initial course data for editing
 * @param {string} props.courseId - Course ID for editing mode
 */
const CourseFormBase = ({ initialData = {}, courseId = null }) => {
    const { isSaving, handleSave, formData, handlers, error, success, validationErrors, setError, setSuccess } = useCourseFormData({ initialData });

    const [previewVisible, setPreviewVisible] = useState(true);
    const [activeSection, setActiveSection] = useState("basic");
    const [toasts, setToasts] = useState([]);
    const sectionRefs = useRef({});

    /**
     * Add a new toast notification
     * @param {string} message - Toast message
     * @param {string} type - Toast type (success, error, info)
     * @param {number} duration - Display duration in ms
     */
    const addToast = (message, type = "info", duration = 5000) => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, message, type, duration }]);
    };

    /**
     * Remove a toast notification
     * @param {number} id - Toast ID to remove
     */
    const removeToast = (id) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    };

    /**
     * Scrolls to a specific form section
     * @param {string} sectionId - ID of the section to scroll to
     */
    const scrollToSection = (sectionId) => {
        sectionRefs.current[sectionId]?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
        setActiveSection(sectionId);
    };

    /**
     * Toggles the preview panel visibility
     */
    const togglePreview = () => {
        setPreviewVisible(!previewVisible);
    };

    /**
     * Enhanced save handler with toast notifications
     */
    const handleSaveWithToast = async () => {
        try {
            await handleSave();
            addToast("Course saved successfully!", "success");
        } catch (err) {
            addToast(err.message || "Failed to save course", "error");
        }
    };

    // Show toast notifications for errors and success
    useEffect(() => {
        if (error) {
            addToast(error, "error");
            setError(null);
        }
    }, [error]);

    useEffect(() => {
        if (success) {
            addToast("Course saved successfully!", "success");
            setSuccess(false);
        }
    }, [success]);

    // Set up intersection observer for active section tracking
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { threshold: 0.3 }
        );

        // Observe all section elements
        Object.values(sectionRefs.current).forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        // Cleanup observer on unmount
        return () => {
            Object.values(sectionRefs.current).forEach((ref) => {
                if (ref) observer.unobserve(ref);
            });
        };
    }, [sectionRefs.current]);

    // Check if form has validation errors
    const hasValidationErrors = Object.keys(validationErrors).length > 0;

    return (
        <div className="">
            {/* Toast Container */}
            <ToastContainer toasts={toasts} removeToast={removeToast} />

            {/* Header */}
            <CourseFormHeader togglePreview={togglePreview} previewVisible={previewVisible} formData={formData} handlers={handlers} courseId={courseId} />

            {/* Main Layout */}
            <div className="grid grid-cols-7 gap-4">
                {/* Left Sidebar - Navigation */}
                <div className="col-span-1">
                    <SidebarNavigation activeSection={activeSection} scrollToSection={scrollToSection} formData={formData} handlers={handlers} />
                </div>

                {/* Main Content Area */}
                <div className={GlobalUtils.cn("transition-all duration-300 ease-in-out", previewVisible ? "col-span-4" : "col-span-6")}>
                    <ScrollArea className="h-[85vh]">
                        <div className="pr-4">
                            {/* Validation Error Summary */}
                            {hasValidationErrors && (
                                <div className="mb-6 p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 rounded-lg">
                                    <div className="flex items-center mb-2">
                                        <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mr-2" />
                                        <h3 className="text-red-800 dark:text-red-400 font-semibold">Please fix the following errors:</h3>
                                    </div>
                                    <ul className="list-disc list-inside text-red-700 dark:text-red-300 text-sm space-y-1">
                                        {Object.entries(validationErrors).map(([field, error]) => (
                                            <li key={field}>{error}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Form Sections */}
                            <FormSections handlers={handlers} formData={formData} sectionRefs={sectionRefs} activeSection={activeSection} validationErrors={validationErrors} />

                            {/* Save Button - Sticky at bottom */}
                            <div className="sticky bottom-0 pt-6 pb-4 bg-gradient-to-t from-gray-50 dark:from-gray-950 to-transparent">
                                <div className="flex justify-end space-x-4">
                                    {/* Save as Draft Button */}
                                    <Button
                                        variant="outline"
                                        className="px-6"
                                        disabled={isSaving}
                                        onClick={() => {
                                            // Save as draft logic
                                            const draftData = { ...formData, status: "draft" };
                                            // Handle draft save
                                        }}
                                    >
                                        Save as Draft
                                    </Button>

                                    {/* Main Save Button */}
                                    <Button
                                        className={`px-8 py-3 font-semibold transition-all duration-300 ${
                                            hasValidationErrors
                                                ? "bg-gray-400 hover:bg-gray-500 cursor-not-allowed"
                                                : "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg hover:shadow-xl transform hover:scale-105"
                                        } text-white`}
                                        disabled={isSaving || hasValidationErrors}
                                        onClick={handleSave}
                                    >
                                        {isSaving ? (
                                            <>
                                                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                                                Saving Course...
                                            </>
                                        ) : hasValidationErrors ? (
                                            <>
                                                <AlertCircle className="h-5 w-5 mr-2" />
                                                Fix Errors to Save
                                            </>
                                        ) : (
                                            <>
                                                <Sparkles className="h-5 w-5 mr-2" />
                                                Save Course
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </ScrollArea>
                </div>

                {/* Right Sidebar - Preview */}
                {previewVisible && (
                    <div className="col-span-2">
                        <div className="sticky top-8">
                            <CoursePreview data={formData} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CourseFormBase;
