"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, Sparkles, AlertCircle, Menu, X, Eye, EyeOff } from "lucide-react";
import LessonFormHeader from "./components/header";
import { Button } from "@/components/ui/button";
import { SidebarNavigation } from "./components/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FormSections } from "./components/form-sections";
import { useLessonFormData } from "./hooks";
import { LessonPreview } from "./components/preview";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { hasValidationErrors } from "./utils/validation";

/**
 * Lesson Form Base Component
 * @description Main container for lesson creation/editing form with improved responsiveness
 */
const LessonFormBase = ({ initialData = {}, lessonId = null }) => {
    const { isSaving, handleSave, formData, handlers, validationErrors } = useLessonFormData({ initialData });

    const [previewVisible, setPreviewVisible] = useState(true);
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [activeSection, setActiveSection] = useState("basic");
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);
    const [viewportWidth, setViewportWidth] = useState(0);
    const sectionRefs = useRef({});

    const hasErrors = hasValidationErrors(validationErrors);

    // Enhanced responsive breakpoints
    const BREAKPOINTS = {
        mobile: 768,
        tablet: 1200,
        desktop: 1300,
        wide: 1600,
    };

    // Check screen size with more granular control
    useEffect(() => {
        const checkScreenSize = () => {
            const width = window.innerWidth;
            setViewportWidth(width);
            setIsMobile(width < BREAKPOINTS.mobile);
            setIsTablet(width >= BREAKPOINTS.mobile && width < BREAKPOINTS.tablet);

            // Auto-hide preview and sidebar based on screen size
            if (width < BREAKPOINTS.tablet) {
                setPreviewVisible(false);
                setSidebarVisible(false);
            } else if (width >= BREAKPOINTS.desktop) {
                setPreviewVisible(true);
                setSidebarVisible(false); // Desktop shows sidebar inline
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
        // Close sidebar on mobile/tablet after navigation
        if (isMobile || isTablet) {
            setSidebarVisible(false);
        }
    };

    /**
     * Toggle preview panel visibility
     */
    const togglePreview = () => {
        setPreviewVisible(!previewVisible);
    };

    /**
     * Toggle sidebar visibility
     */
    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
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

    // Calculate layout classes based on viewport
    const getLayoutClasses = () => {
        if (isMobile || isTablet) {
            return {
                container: "flex flex-col gap-4",
                sidebar: "hidden", // Hidden - shown as overlay
                main: "w-full",
                preview: "hidden", // Hidden - shown as overlay
            };
        }

        // Desktop and wider - with dynamic preview width based on viewport
        const isWideScreen = viewportWidth >= BREAKPOINTS.wide;

        return {
            container: "flex gap-4",
            sidebar: "w-50 min-w-[180px] flex-shrink-0",
            main: "flex-1 min-w-0",
            preview: previewVisible ? `${isWideScreen ? "w-[450px]" : "w-80"} min-w-[320px] flex-shrink-0` : "hidden",
        };
    };

    const layoutClasses = getLayoutClasses();

    return (
        <ErrorBoundary>
            <div className="lesson-form-container">
                <LessonFormHeader togglePreview={togglePreview} previewVisible={previewVisible} formData={formData} handlers={handlers} lessonId={lessonId} />

                {/* Mobile/Tablet Toggle Buttons */}
                {(isMobile || isTablet) && (
                    <div className="flex gap-2 p-4 border-b border-gray-200 dark:border-gray-700">
                        <Button variant="outline" size="sm" onClick={toggleSidebar} className="flex items-center gap-2">
                            <Menu className="h-4 w-4" />
                            Navigation
                        </Button>
                        <Button variant="outline" size="sm" onClick={togglePreview} className="flex items-center gap-2">
                            {previewVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            Preview
                        </Button>
                    </div>
                )}

                <div className={`${layoutClasses.container} transition-all duration-300 ease-in-out`}>
                    {/* Sidebar Navigation - Desktop */}
                    {!isMobile && !isTablet && (
                        <div className={`${layoutClasses.sidebar} transition-all duration-300`}>
                            <div className="sticky top-8">
                                <SidebarNavigation activeSection={activeSection} scrollToSection={scrollToSection} formData={formData} handlers={handlers} />
                            </div>
                        </div>
                    )}

                    {/* Main Content */}
                    <div className={`${layoutClasses.main} transition-all duration-300 ease-in-out`}>
                        <ScrollArea className={`${isMobile || isTablet ? "h-auto" : "h-[85vh]"}`}>
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
                                                    Saving Lesson...
                                                </>
                                            ) : hasErrors ? (
                                                <>
                                                    <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                                                    Fix Errors to Save
                                                </>
                                            ) : (
                                                <>
                                                    <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                                                    Save Lesson
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </ScrollArea>
                    </div>

                    {/* Preview Panel - Desktop */}
                    {!isMobile && !isTablet && previewVisible && (
                        <div className={`${layoutClasses.preview} transition-all duration-300`}>
                            <div className="sticky top-8">
                                <LessonPreview data={formData} />
                            </div>
                        </div>
                    )}
                </div>

                {/* Sidebar Overlay - Mobile/Tablet */}
                {(isMobile || isTablet) && sidebarVisible && (
                    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-all duration-300">
                        <div
                            className={`
                            fixed top-0 left-0 h-full bg-white dark:bg-gray-900 shadow-2xl 
                            transform transition-transform duration-300 ease-out
                            ${sidebarVisible ? "translate-x-0" : "-translate-x-full"}
                            ${"w-fit"}
                        `}
                        >
                            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold">Navigation</h3>
                                <Button variant="ghost" size="sm" onClick={toggleSidebar}>
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                            <div className="overflow-auto h-[calc(100vh-80px)]">
                                <div className="p-4">
                                    <SidebarNavigation activeSection={activeSection} scrollToSection={scrollToSection} formData={formData} handlers={handlers} />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Preview Overlay - Mobile/Tablet */}
                {(isMobile || isTablet) && previewVisible && (
                    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-all duration-300">
                        <div
                            className={`
                            fixed top-0 right-0 h-full bg-white dark:bg-gray-900 shadow-2xl 
                            transform transition-transform duration-300 ease-out
                            ${previewVisible ? "translate-x-0" : "translate-x-full"}
                            ${"w-fit"}
                        `}
                        >
                            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold">Lesson Preview</h3>
                                <Button variant="ghost" size="sm" onClick={togglePreview}>
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                            <div className="overflow-auto h-[calc(100vh-80px)]">
                                <LessonPreview data={formData} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </ErrorBoundary>
    );
};

export default LessonFormBase;
