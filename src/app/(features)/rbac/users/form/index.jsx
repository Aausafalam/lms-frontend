"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import UserFormHeader from "./components/header";
import UserFormSidebar from "./components/sidebar";
import UserFormSections from "./components/form-sections";
import { useUserForm } from "./hooks";
import { useNavigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Save } from "lucide-react";

const UserForm = () => {
    const { formData, setFormData, errors, setErrors, isSaving, loading, setLoading, handleSubmit, validateForm, resetForm, handlers } = useUserForm();
    const [activeSection, setActiveSection] = useState("basic");
    const params = useParams();
    const userId = params.userId;
    const isEdit = Boolean(userId && userId !== "add");
    const { navigate } = useNavigation();

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

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            setLoading(true);
            await handleSubmit();

            // Redirect to users list on success
            navigate("/rbac/users");
        } catch (error) {
            console.error("Error saving user:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        if (window.confirm("Are you sure you want to cancel? Any unsaved changes will be lost.")) {
            navigate("/rbac/users");
        }
    };

    return (
        <div>
            <UserFormHeader userId={userId} />

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Sidebar */}
                <div className="hidden lg:block lg:col-span-1">
                    <UserFormSidebar activeSection={activeSection} scrollToSection={scrollToSection} formData={formData} handlers={handlers} />
                </div>

                {/* Main Content */}
                <div className="lg:col-span-4 col-span-1">
                    <ScrollArea className="h-[85vh]">
                        <div className="pr-3 space-y-8">
                            <UserFormSections handlers={handlers} formData={formData} sectionRefs={sectionRefs} activeSection={activeSection} />

                            {/* Save Button */}
                            <div className="sticky bottom-0 bg-white dark:bg-gray-900 p-4 border-t border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
                                <Button className="w-full sm:w-auto ml-auto flex bg-orange-500 hover:bg-orange-600" disabled={isSaving} onClick={handleFormSubmit} size="lg">
                                    {isSaving ? (
                                        <>
                                            <Loader2 className="h-5 w-5 animate-spin mr-2" />
                                            Saving User...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="h-5 w-5 mr-2" />
                                            Save User
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

export default UserForm;
