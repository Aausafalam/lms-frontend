"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, Sparkles, AlertCircle } from "lucide-react";
import CourseFormHeader from "./components/header";
import { Button } from "@/components/ui/button";
import { SidebarNavigation } from "./components/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FormSections } from "./components/form-sections";
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
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);
    const sectionRefs = useRef({});

    const hasErrors = hasValidationErrors(validationErrors);

    // Check screen size
    useEffect(() => {
        const checkScreenSize = () => {
            const width = window.innerWidth;
            setIsMobile(width < 768);
            setIsTablet(width >= 768 && width < 1024);

            // Auto-hide preview on mobile and tablet
            if (width < 1024) {
                setPreviewVisible(false);
            } else {
                setPreviewVisible(true);
            }
        };

        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);
        return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

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

                <div
                    className={`grid transition-all duration-300 ${
                        isMobile ? "grid-cols-1 gap-4" : isTablet ? (previewVisible ? "grid-cols-4 gap-4" : "grid-cols-1 gap-4") : previewVisible ? "grid-cols-7 gap-4" : "grid-cols-7 gap-4"
                    }`}
                >
                    {/* Sidebar Navigation */}
                    <div className={`${isMobile ? "order-2" : isTablet ? "col-span-1" : "col-span-1"}`}>
                        <SidebarNavigation activeSection={activeSection} scrollToSection={scrollToSection} formData={formData} handlers={handlers} />
                    </div>

                    {/* Main Content */}
                    <div
                        className={`${
                            isMobile ? "order-1" : isTablet ? (previewVisible ? "col-span-2" : "col-span-3") : previewVisible ? "col-span-4" : "col-span-6"
                        } transition-all duration-300 ease-in-out`}
                    >
                        <ScrollArea className={`${isMobile ? "h-auto" : "h-[85vh]"}`}>
                            <div className="pr-2 sm:pr-4">
                                {/* Validation Error Summary */}
                                {hasErrors && (
                                    <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 rounded-lg">
                                        <div className="flex items-center mb-2">
                                            <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-600 dark:text-red-400 mr-2" />
                                            <h3 className="text-red-800 dark:text-red-400 font-semibold text-sm sm:text-base">Please fix the following errors:</h3>
                                        </div>
                                        <ul className="list-disc list-inside text-red-700 dark:text-red-300 text-xs sm:text-sm space-y-1">
                                            {Object.entries(validationErrors).map(([field, error]) => (
                                                <li key={field}>{error}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Form Sections */}
                                <FormSections handlers={handlers} formData={formData} sectionRefs={sectionRefs} activeSection={activeSection} validationErrors={validationErrors} />

                                {/* Save Button */}
                                <div className="sticky bottom-0 pt-4 sm:pt-6 pb-4 bg-gradient-to-t from-gray-50 dark:from-gray-950 to-transparent">
                                    <div className="flex justify-end">
                                        <Button
                                            className={`px-6 sm:px-8 py-2 sm:py-3 font-semibold transition-all duration-300 text-sm sm:text-base ${
                                                hasErrors
                                                    ? "bg-gray-400 hover:bg-gray-500 cursor-not-allowed"
                                                    : "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg hover:shadow-xl transform hover:scale-105"
                                            } text-white`}
                                            disabled={isSaving || hasErrors}
                                            onClick={handleSave}
                                        >
                                            {isSaving ? (
                                                <>
                                                    <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin mr-2" />
                                                    Saving Course...
                                                </>
                                            ) : hasErrors ? (
                                                <>
                                                    <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                                                    Fix Errors to Save
                                                </>
                                            ) : (
                                                <>
                                                    <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
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
                    {previewVisible && !isMobile && (
                        <div className={`${isTablet ? "col-span-1" : "col-span-2"} transition-all duration-300`}>
                            <div className="sticky top-8">
                                <CoursePreview data={formData} />
                            </div>
                        </div>
                    )}
                </div>

                {/* Mobile Preview Modal/Drawer */}
                {isMobile && previewVisible && (
                    <div className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center p-4">
                        <div className="bg-white dark:bg-gray-900 rounded-t-xl sm:rounded-xl w-full max-w-md max-h-[80vh] overflow-hidden">
                            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold">Course Preview</h3>
                                <Button variant="ghost" size="sm" onClick={togglePreview}>
                                    ×
                                </Button>
                            </div>
                            <div className="overflow-auto max-h-[60vh]">
                                <CoursePreview data={formData} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </ErrorBoundary>
    );
};

export default CourseFormBase;
