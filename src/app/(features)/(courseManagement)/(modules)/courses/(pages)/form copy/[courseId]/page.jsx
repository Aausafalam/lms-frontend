"use client";
import React, { useState } from "react";
import BasicDetails from "./components/basicDetails";
import { Briefcase, LayoutDashboard, SparklesIcon } from "lucide-react";
import { useParams } from "next/navigation";
import Tabs from "@/components/tab";
import CourseCurriculumDetails from "./components/curriculumDetails";
import FAQDetails from "./components/faqDetails";
import PriceDetails from "./components/priceDetails";
import CourseDetails from "./components/courseDetails";
import CertificateDetails from "./components/certificateDetails/index.jsx";
import { Breadcrumb } from "@/components/Breadcrumb";
import InstructorDetails from "./components/instructorsDetails";
import { CurriculumProvider } from "./hooks/use-curriculum";
import CourseCurriculumBuilder from "./components/course-curriculum/course-curriculum-builder";

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

    const breadcrumbItems = [
        {
            title: "Courses",
            href: "/courses",
            icon: <LayoutDashboard className="h-3.5 w-3.5" />,
        },
        {
            title: "Add Course",
            href: `courses/details/1`,
            icon: <Briefcase className="h-3.5 w-3.5" />,
        },
    ];

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
            id: "courseDetails",
            label: "Course Details",
            icon: <SparklesIcon className="size-4" />,
            content: <CourseDetails courseId={courseId} handleNextTab={handleNextTab} />,
        },
        {
            id: "instructorDetails",
            label: "Instructors Details",
            icon: <SparklesIcon className="size-4" />,
            content: <InstructorDetails courseId={courseId} handleNextTab={handleNextTab} />,
        },
        {
            id: "curriculum",
            label: "Curriculum",
            icon: <SparklesIcon className="size-4" />,
            content: (
                <CurriculumProvider>
                    <CourseCurriculumBuilder />
                </CurriculumProvider>
            ),
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
            <Breadcrumb items={breadcrumbItems} className={"mb-4"} />
            <Tabs defaultTab={activeTab} tabs={tabs} variant={"underline"} onTabChange={(tab) => setActiveTab(tab)} />
        </div>
    );
};

export default CourseForm;
