"use client";

import { Breadcrumb } from "@/components/Breadcrumb";
import { LayoutDashboard, HelpCircle, Settings } from "lucide-react";
import QuestionDetailsContent from "./components/content";
import { useState } from "react";
import { useQueryParams } from "@/lib/hooks/useQuery";

/**
 * QuestionDetailsPage Component
 * Main page for displaying detailed question information
 */
export default function QuestionDetailsPage({}) {
    const [activeTab, setActiveTab] = useState("overview");
    const { courseId } = useQueryParams();

    const breadcrumbItems = [
        {
            title: "Question Bank",
            href: `/question-panel`,
            icon: <HelpCircle className="h-3.5 w-3.5" />,
        },
        {
            title: "Question Details",
            icon: <Settings className="h-3.5 w-3.5" />,
        },
    ];

    return (
        <div className="transition-colors duration-300">
            {/* Header */}
            <Breadcrumb items={breadcrumbItems} className="mb-4" />
            {/* Main Content Area */}
            <div className="flex gap-4 w-full">
                {/* Content Area */}
                <div className="max-w-[1225px] m-auto">
                    <QuestionDetailsContent activeTab={activeTab} />
                </div>
            </div>
        </div>
    );
}
