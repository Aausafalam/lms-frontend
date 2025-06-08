"use client";

import { FileText, FileAudio, Tag, PresentationIcon } from "lucide-react";
import SidebarMenu from "@/components/sidebarMenu";

export function SidebarNavigation({ activeTab, setActiveTab }) {
    const navigationItems = [
        { id: "overview", label: "Overview", icon: <FileText className="h-4 w-4" /> },
        { id: "quiz", label: "Quiz", icon: <FileAudio className="h-4 w-4" /> },
        { id: "assignment", label: "Assignments", icon: <Tag className="h-4 w-4" /> },
        { id: "transcript", label: "Transcript", icon: <PresentationIcon className="h-4 w-4" /> },
    ];

    return (
        <div className="sticky top-8 max-w-48">
            <SidebarMenu navigationItems={navigationItems} activeSection={activeTab} onClick={setActiveTab} />
        </div>
    );
}
