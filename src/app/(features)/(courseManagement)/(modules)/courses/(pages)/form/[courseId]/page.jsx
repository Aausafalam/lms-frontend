"use client";
import React, { useState } from "react";
import BasicDetails from "./components/basicDetails";
import { SparklesIcon } from "lucide-react";
import { useParams } from "next/navigation";
import Tabs from "@/components/tab";
import CourseCurriculumDetails from "./components/curriculumDetails";
import FAQDetails from "./components/faqDetails";
import PriceDetails from "./components/priceDetails";
import CourseDetails from "./components/courseDetails";
import CertificateDetails from "./components/certificateDetails.js";

const CourseForm = () => {
    const { courseId } = useParams();
    const [activeTab, setActiveTab] = useState({ id: "basicDetails", label: "Basic Details" });

    const handleNextTab = (response) => {
        if (activeTab.id === "basicDetails") {
            setActiveTab({ id: "permissions", label: "Permissions" });
        } else if (activeTab.id === "permissions") {
            setActiveTab({ id: "users", label: "Assign Users" });
        }
    };

    const tabs = [
        {
            id: "basicDetails",
            label: "Basic Details",
            icon: <SparklesIcon className="size-4" />,
            content: <BasicDetails courseId={courseId} handleNextTab={handleNextTab} />,
        },
        {
            id: "priceDetails",
            label: "Price Details",
            icon: <SparklesIcon className="size-4" />,
            content: <PriceDetails courseId={courseId} handleNextTab={handleNextTab} />,
        },
        {
            id: "details",
            label: "Details",
            icon: <SparklesIcon className="size-4" />,
            content: <CourseDetails courseId={courseId} handleNextTab={handleNextTab} />,
        },
        {
            id: "curriculum",
            label: "Curriculum",
            icon: <SparklesIcon className="size-4" />,
            content: <CourseCurriculumDetails />,
        },
        {
            id: "certificate",
            label: "Certificate",
            icon: <SparklesIcon className="size-4" />,
            content: <CertificateDetails courseId={courseId} handleNextTab={handleNextTab} />,
        },
        {
            id: "faq",
            label: "FAQ",
            icon: <SparklesIcon className="size-4" />,
            content: <FAQDetails />,
        },
    ];

    return (
        <div>
            <Tabs defaultTab={activeTab} tabs={tabs} variant={"underline"} onTabChange={(tab) => setActiveTab(tab)} />
        </div>
    );
};

export default CourseForm;
