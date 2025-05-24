"use client";
import React, { useEffect, useRef, useState } from "react";
import ModuleFormHeader from "./components/header";
import { Button } from "@/components/ui/button";
import { Loader2, Save, Sparkles } from "lucide-react";
import { SidebarNavigation } from "./components/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FormSections } from "./components/form-sections";
import GlobalUtils from "@/lib/utils";
import { useModuleFormData } from "./hooks";
import { ModulePreview } from "./components/preview";

const ModuleFormBase = ({ initialData = {}, moduleId = null }) => {
    const { isSaving, handleSave, formData, handlers } = useModuleFormData({ initialData });
    const [previewVisible, setPreviewVisible] = useState(true);
    const [activeSection, setActiveSection] = useState("basic");
    const sectionRefs = useRef({});

    const scrollToSection = (sectionId) => {
        sectionRefs.current[sectionId]?.scrollIntoView({ behavior: "smooth", block: "start" });
        setActiveSection(sectionId);
    };

    const togglePreview = () => {
        setPreviewVisible(!previewVisible);
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
    }, [sectionRefs.current]);

    return (
        <div>
            <ModuleFormHeader togglePreview={togglePreview} previewVisible={previewVisible} formData={formData} handlers={handlers} moduleId={moduleId} />
            <div className="grid grid-cols-7 gap-3">
                {/* Left Sidebar - Navigation */}
                <div className="col-span-1">
                    <SidebarNavigation activeSection={activeSection} scrollToSection={scrollToSection} formData={formData} handlers={handlers} />
                </div>

                {/* Main Content Area */}
                <div className={GlobalUtils.cn("transition-all duration-300 ease-in-out", previewVisible ? "col-span-4" : "col-span-6")}>
                    <ScrollArea className="h-[85vh]">
                        <div className="pr-3">
                            <FormSections handlers={handlers} formData={formData} sectionRefs={sectionRefs} activeSection={activeSection} />

                            <div className="sticky bottom-0 ml-auto w-full text-right z-10">
                                <Button className="ml-auto" disabled={isSaving} onClick={handleSave}>
                                    {isSaving ? (
                                        <>
                                            <Loader2 className="h-5 w-5 animate-spin" />
                                            Saving Module...
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles className="h-5 w-5" /> Save Module
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </ScrollArea>
                </div>
                {previewVisible && (
                    <div className="col-span-2">
                        <ModulePreview data={formData} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ModuleFormBase;
