"use client";

import { courseDetailsData } from "./data/course-data";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Briefcase, LayoutDashboard } from "lucide-react";
import { SidebarNavigation } from "./components/sidebar";
import CourseDetailsContent from "./components/content";
import { useState } from "react";
import { useParams } from "next/navigation";

export default function CourseDetailsPage({ course = courseDetailsData }) {
    const [activeTab, setActiveTab] = useState("overview");
    const { courseId } = useParams();
    const breadcrumbItems = [
        {
            title: "Courses",
            href: "/courses",
            icon: <LayoutDashboard className="h-3.5 w-3.5" />,
        },
        {
            title: "Course Details",
            href: `courses/details/${courseId}`,
            icon: <Briefcase className="h-3.5 w-3.5" />,
        },
    ];

    return (
        <div className="transition-colors duration-300">
            <Breadcrumb items={breadcrumbItems} className={"mb-4"} />

            <div className="flex gap-4">
                <SidebarNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
                <div className="w-full">
                    <CourseDetailsContent activeTab={activeTab} />
                </div>
            </div>
        </div>
    );
}
