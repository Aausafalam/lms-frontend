"use client";

import { moduleDetailsData } from "./data/module-data";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Briefcase, LayoutDashboard } from "lucide-react";
import { SidebarNavigation } from "./components/sidebar";
import ModuleDetailsContent from "./components/content";
import { useState } from "react";

export default function ModuleDetailsPage({ module = moduleDetailsData }) {
    const [activeTab, setActiveTab] = useState("overview");
    const breadcrumbItems = [
        {
            title: "Modules",
            href: "/modules",
            icon: <LayoutDashboard className="h-3.5 w-3.5" />,
        },
        {
            title: "Module Details",
            href: `modules/details/1`,
            icon: <Briefcase className="h-3.5 w-3.5" />,
        },
    ];

    return (
        <div className="transition-colors duration-300">
            <Breadcrumb items={breadcrumbItems} className={"mb-4"} />

            <div className="flex gap-4">
                <SidebarNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
                <div className="w-full">
                    <ModuleDetailsContent activeTab={activeTab} />
                </div>
            </div>
        </div>
    );
}
