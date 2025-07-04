"use client";

import { useEffect, useRef, useState } from "react";
import RouteFormHeader from "./components/header";
import { Button } from "@/components/ui/button";
import { Loader2, Save, CheckCircle, AlertCircle } from "lucide-react";
import { SidebarNavigation } from "./components/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FormSections } from "./components/form-sections";
import { useRouteFormData } from "./hooks";
import { Alert, AlertDescription } from "@/components/ui/alert";

const RouteFormBase = ({ initialData = {}, routeId = null }) => {
    const { isSaving, handleSave, formData, handlers, error, success } = useRouteFormData({ initialData });
    const [activeSection, setActiveSection] = useState("basic");
    const sectionRefs = useRef({});

    const scrollToSection = (sectionId) => {
        sectionRefs.current[sectionId]?.scrollIntoView({ behavior: "smooth", block: "start" });
        setActiveSection(sectionId);
    };

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
        <div className="max-w-[1400px]">
            <div>
                <RouteFormHeader routeId={routeId} />
            </div>

            {/* Error/Success Messages */}
            {error && (
                <Alert variant="destructive" className="mb-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {success && (
                <Alert className="mb-4 border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-200">
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>Route saved successfully!</AlertDescription>
                </Alert>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                {/* Sidebar */}
                <div className="hidden lg:block lg:col-span-1">
                    <SidebarNavigation activeSection={activeSection} scrollToSection={scrollToSection} formData={formData} handlers={handlers} />
                </div>

                {/* Main Content */}
                <div className="lg:col-span-4 col-span-1">
                    <ScrollArea className="h-[85vh]">
                        <div className="pr-3 space-y-8">
                            <FormSections handlers={handlers} formData={formData} sectionRefs={sectionRefs} activeSection={activeSection} />

                            {/* Save Button */}
                            <div className="sticky bottom-0 bg-white dark:bg-gray-900 p-4 border-t border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
                                <Button className="w-full sm:w-auto ml-auto flex" disabled={isSaving} onClick={handleSave} size="lg">
                                    {isSaving ? (
                                        <>
                                            <Loader2 className="h-5 w-5 animate-spin mr-2" />
                                            Saving Route...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="h-5 w-5 mr-2" />
                                            Save Route
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </ScrollArea>
                </div>
            </div>
        </div>
    );
};

export default RouteFormBase;
