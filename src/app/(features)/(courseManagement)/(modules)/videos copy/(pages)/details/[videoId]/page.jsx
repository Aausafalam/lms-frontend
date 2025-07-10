"use client";

import { Breadcrumb } from "@/components/Breadcrumb";
import { FileAudio, LayoutDashboard } from "lucide-react";
import { SidebarNavigation } from "./components/sidebar";
import VideosDetailsView from "./components/content";
import { useState } from "react";
import { useQueryParams } from "@/lib/hooks/useQuery";

export default function VideosDetailsPage({}) {
    const [activeTab, setActiveTab] = useState("overview");
    const { courseId, moduleId, lessonId } = useQueryParams();
    const breadcrumbItems = [
        {
            title: "Course",
            href: "/courses",
            icon: <LayoutDashboard className="h-3.5 w-3.5" />,
        },
        {
            title: "Modules",
            href: `/courses/${courseId}`,
            icon: <LayoutDashboard className="h-3.5 w-3.5" />,
        },

        {
            title: "Lessons",
            href: `/lessons?courseId=${courseId}&moduleId=${moduleId}`,
            icon: <LayoutDashboard className="h-3.5 w-3.5" />,
        },
        {
            title: "Videos",
            href: `/lessons/details/${lessonId}?courseId=${courseId}&moduleId=${moduleId}&lessonId=${lessonId}`,
            icon: <LayoutDashboard className="h-3.5 w-3.5" />,
        },
        {
            title: "Video Details",
            href: `/videos/details/1`,
            icon: <FileAudio className="h-3.5 w-3.5" />,
        },
    ];

    return (
        <div className="transition-colors duration-300">
            <Breadcrumb items={breadcrumbItems} className={"mb-4"} />

            <div className="flex gap-4">
                <SidebarNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
                <div className="w-full">
                    <VideosDetailsView activeTab={activeTab} />
                </div>
            </div>
        </div>
    );
}
