"use client";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Briefcase, LayoutDashboard } from "lucide-react";
import { SidebarNavigation } from "./components/sidebar";
import LessonDetailsContent from "./components/content";
import { useState } from "react";

export default function LessonDetailsPage() {
    const [activeTab, setActiveTab] = useState("overview");
    const breadcrumbItems = [
        {
            title: "Course",
            href: "/courses",
            icon: <LayoutDashboard className="h-3.5 w-3.5" />,
        },
        {
            title: "Modules",
            href: "/modules",
            icon: <LayoutDashboard className="h-3.5 w-3.5" />,
        },

        {
            title: "Lessons",
            href: "/lessons",
            icon: <LayoutDashboard className="h-3.5 w-3.5" />,
        },
        {
            title: "Lesson Details",
            href: `lessons/details/1`,
            icon: <Briefcase className="h-3.5 w-3.5" />,
        },
    ];

    return (
        <div className="transition-colors duration-300">
            <Breadcrumb items={breadcrumbItems} className={"mb-4"} />

            <div className="flex gap-4">
                <SidebarNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
                <div className="w-full">
                    <LessonDetailsContent activeTab={activeTab} />
                </div>
            </div>
        </div>
    );
}
