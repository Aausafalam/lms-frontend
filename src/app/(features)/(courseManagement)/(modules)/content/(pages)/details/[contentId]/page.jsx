"use client";

import { contentDetailsData } from "./data/content-data";
import { Breadcrumb } from "@/components/Breadcrumb";
import { FileAudio, LayoutDashboard } from "lucide-react";
import { SidebarNavigation } from "./components/sidebar";
import ContentDetailsView from "./components/content";
import { useState } from "react";

export default function ContentDetailsPage({ content = contentDetailsData }) {
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
            title: "Content",
            href: "/content",
            icon: <LayoutDashboard className="h-3.5 w-3.5" />,
        },
        {
            title: "Content Details",
            href: `/content/details/1`,
            icon: <FileAudio className="h-3.5 w-3.5" />,
        },
    ];

    return (
        <div className="transition-colors duration-300">
            <Breadcrumb items={breadcrumbItems} className={"mb-4"} />

            <div className="flex gap-4">
                <SidebarNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
                <div className="w-full">
                    <ContentDetailsView activeTab={activeTab} />
                </div>
            </div>
        </div>
    );
}
