"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, Sparkles, AlertCircle } from "lucide-react";
import CourseFormHeader from "./components/header";
import { Button } from "@/components/ui/button";
import { SidebarNavigation } from "./components/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FormSections } from "./components/form-sections";
import GlobalUtils from "@/lib/utils";
import { useCourseFormData } from "./hooks";
import { CoursePreview } from "./components/preview";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { hasValidationErrors } from "./utils/validation";

/**
 * Course Form Base Component
 * @description Main container for course creation/editing form
 */
const CourseFormBase = ({ initialData = {}, courseId = null }) => {
    const { isSaving, handleSave, formData, handlers, validationErrors } = useCourseFormData({ initialData });

    const [previewVisible, setPreviewVisible] = useState(true);
    const [activeSection, setActiveSection] = useState("basic");
    const sectionRefs = useRef({});

    const hasErrors = hasValidationErrors(validationErrors);

    /**
     * Scroll to specific form section
     */
    const scrollToSection = (sectionId) => {
        sectionRefs.current[sectionId]?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
        setActiveSection(sectionId);
    };

    /**
     * Toggle preview panel visibility
     */
    const togglePreview = () => {
        setPreviewVisible(!previewVisible);
    };

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

        Object.values(sectionRefs.current).forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => {
            Object.values(sectionRefs.current).forEach((ref) => {
                if (ref) observer.unobserve(ref);
            });
        };
    }, []);

    return (
        <ErrorBoundary>
            <div className="course-form-container">
                <CourseFormHeader togglePreview={togglePreview} previewVisible={previewVisible} formData={formData} handlers={handlers} courseId={courseId} />

                <div className="grid grid-cols-7 gap-4">
                    {/* Sidebar Navigation */}
                    <div className="col-span-1">
                        <SidebarNavigation activeSection={activeSection} scrollToSection={scrollToSection} formData={formData} handlers={handlers} />
                    </div>

                    {/* Main Content */}
                    <div className={GlobalUtils.cn("transition-all duration-300 ease-in-out", previewVisible ? "col-span-4" : "col-span-6")}>
                        <ScrollArea className="h-[85vh]">
                            <div className="pr-4">
                                {/* Validation Error Summary */}
                                {hasErrors && (
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

                                {/* Save Button */}
                                <div className="sticky bottom-0 pt-6 pb-4 bg-gradient-to-t from-gray-50 dark:from-gray-950 to-transparent">
                                    <div className="flex justify-end">
                                        <Button
                                            className={`px-8 py-3 font-semibold transition-all duration-300 ${
                                                hasErrors
                                                    ? "bg-gray-400 hover:bg-gray-500 cursor-not-allowed"
                                                    : "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg hover:shadow-xl transform hover:scale-105"
                                            } text-white`}
                                            disabled={isSaving || hasErrors}
                                            onClick={handleSave}
                                        >
                                            {isSaving ? (
                                                <>
                                                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                                                    Saving Course...
                                                </>
                                            ) : hasErrors ? (
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

                    {/* Preview Panel */}
                    {previewVisible && (
                        <div className="col-span-2">
                            <div className="sticky top-8">
                                <CoursePreview data={formData} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </ErrorBoundary>
    );
};

export default CourseFormBase;
