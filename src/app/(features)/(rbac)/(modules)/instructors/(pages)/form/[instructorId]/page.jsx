"use client";

import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import { X, Save, ChevronRight, ChevronLeft, SparklesIcon, LayoutDashboard, Briefcase } from "lucide-react";
import InstructorBasicInfoForm from "./components/basicInfo";
import InstructorExpertiseForm from "./components/expertise";
import InstructorEducationForm from "./components/education";
import InstructorAdditionalInfoForm from "./components/additionalInfo";
import Tabs from "@/components/tab";
import { useParams } from "next/navigation";
import { Breadcrumb } from "@/components/Breadcrumb";

// Default empty instructor object
const emptyInstructor = {
    id: "",
    name: "",
    email: "",
    phone: "",
    title: "",
    bio: "",
    expertise: [],
    rating: 5.0,
    courses: 0,
    students: 0,
    imageUrl: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    socialLinks: {
        linkedin: "",
        twitter: "",
        website: "",
        github: "",
    },
    availability: "Full-time",
    joinedDate: new Date().toISOString().split("T")[0],
    education: [],
    certifications: [],
    methodology: "",
    coursesList: [],
    reviews: [],
};

export default function InstructorWizardForm({ instructor, onSave, onCancel }) {
    const { instructorId } = useParams();
    // Initialize form with instructor data or empty object
    const [formData, setFormData] = useState(instructor || emptyInstructor);

    // State for active tab
    const [activeTab, setActiveTab] = useState({ id: "basicDetails", label: "Basic Details" });

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Navigate to next tab
    const handleNextTab = () => {
        if (activeTab.id === "basicDetails") setActiveTab({ id: "expertise", label: "Expertise" });
        else if (activeTab.id === "expertise") setActiveTab({ id: "education", label: "Education" });
        else if (activeTab.id === "education") setActiveTab({ id: "additional", label: "Additional" });
    };

    // Navigate to previous tab
    const handlePrevTab = () => {
        if (activeTab.id === "additional") setActiveTab({ id: "education", label: "Education" });
        else if (activeTab.id === "education") setActiveTab({ id: "expertise", label: "Expertise" });
        else if (activeTab.id === "expertise") setActiveTab({ id: "basicDetails", label: "Basic Details" });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    const tabs = [
        {
            id: "basicDetails",
            label: "Basic Details",
            icon: <SparklesIcon className="size-4" />,
            content: <InstructorBasicInfoForm formData={formData} handleChange={handleChange} />,
        },
        {
            id: "expertise",
            label: "Expertise",
            icon: <SparklesIcon className="size-4" />,
            content: <InstructorExpertiseForm formData={formData} setFormData={setFormData} handleChange={handleChange} />,
        },
        {
            id: "education",
            label: "Education",
            icon: <SparklesIcon className="size-4" />,
            content: <InstructorEducationForm formData={formData} setFormData={setFormData} />,
        },
        {
            id: "additional",
            label: "Additional",
            icon: <SparklesIcon className="size-4" />,
            content: <InstructorAdditionalInfoForm formData={formData} setFormData={setFormData} handleChange={handleChange} />,
        },
    ];

    const breadcrumbItems = [
        {
            title: "Instructors",
            href: "/instructors",
            icon: <LayoutDashboard className="h-3.5 w-3.5" />,
        },
        {
            title: "Add Instructor",
            href: `instructors/details/1`,
            icon: <Briefcase className="h-3.5 w-3.5" />,
        },
    ];

    return (
        <>
            <Breadcrumb items={breadcrumbItems} className={"mb-4"} />
            <Card className="w-full bg-white dark:bg-gray-800 dark:border-gray-700 rounded-xl shadow-md">
                <form onSubmit={handleSubmit}>
                    <Tabs className={"mb-10"} defaultTab={activeTab} tabs={tabs} variant={"underline"} onTabChange={(tab) => setActiveTab(tab)} />

                    <CardFooter className="px-6 py-4 bg-gray-50 dark:bg-gray-900/50 border-t dark:border-gray-700 flex justify-between">
                        <div className="flex gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={onCancel}
                                className="dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700 shadow-sm hover:shadow-md transition-all duration-200"
                            >
                                <X className="h-4 w-4 mr-2" />
                                Cancel
                            </Button>

                            {activeTab !== "basic" && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handlePrevTab}
                                    className="dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700 shadow-sm hover:shadow-md transition-all duration-200"
                                >
                                    <ChevronLeft className="h-4 w-4 mr-2" />
                                    Previous
                                </Button>
                            )}
                        </div>

                        <div>
                            {activeTab !== "additional" ? (
                                <Button
                                    type="button"
                                    onClick={handleNextTab}
                                    className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white shadow-md hover:shadow-lg transition-all duration-200"
                                >
                                    Next
                                    <ChevronRight className="h-4 w-4 ml-2" />
                                </Button>
                            ) : (
                                <Button
                                    type="submit"
                                    className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white shadow-md hover:shadow-lg transition-all duration-200"
                                >
                                    <Save className="h-4 w-4 mr-2" />
                                    {instructor ? "Update Instructor" : "Save Instructor"}
                                </Button>
                            )}
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </>
    );
}
