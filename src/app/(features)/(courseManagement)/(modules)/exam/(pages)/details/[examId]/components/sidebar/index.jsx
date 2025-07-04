"use client";

import { FileText, BookOpen } from "lucide-react";
import SidebarMenu from "@/components/sidebarMenu";

export function SidebarNavigation({ activeTab, setActiveTab }) {
    const navigationItems = [
        { id: "overview", label: "Overview", icon: <FileText className="h-4 w-4" /> },
        { id: "questions", label: "Questions", icon: <BookOpen className="h-4 w-4" /> },
    ];

    return (
        <div className="sticky top-8 max-w-48">
            <SidebarMenu navigationItems={navigationItems} onClick={setActiveTab} activeSection={activeTab} />
        </div>
    );
}
