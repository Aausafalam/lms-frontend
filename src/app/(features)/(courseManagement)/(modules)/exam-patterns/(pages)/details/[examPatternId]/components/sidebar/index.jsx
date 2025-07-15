"use client";

import { FileText, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import GlobalUtils from "@/lib/utils";
import { useSearchParams, useRouter } from "next/navigation";

/**
 * Navigation items configuration
 */
const NAVIGATION_ITEMS = [
    { id: "overview", label: "Overview", icon: <FileText className="h-4 w-4" /> },
    { id: "lessons", label: "Lessons", icon: <ImageIcon className="h-4 w-4" /> },
];

/**
 * Sidebar Navigation Component
 * @description Navigation sidebar for examPattern details sections
 */
export function SidebarNavigation({ activeTab, setActiveTab }) {
    const handleTabClick = (item) => {
        try {
            setActiveTab(item.id);
        } catch (error) {
            console.error("Error updating URL params:", error);
            setActiveTab(item.id);
        }
    };

    return (
        <div className="w-full lg:sticky lg:top-8 lg:max-w-48">
            <Card className="overflow-hidden border-0 bg-white dark:bg-gray-900 dark:border-gray-800">
                <CardContent className="p-2">
                    <nav className="space-y-1" role="navigation" aria-label="ExamPattern sections">
                        {NAVIGATION_ITEMS.map((item) => (
                            <Button
                                key={item.id}
                                variant="ghost"
                                className={GlobalUtils.cn(
                                    "w-full justify-start text-left mb-1 font-normal transition-all px-2 text-xs sm:text-sm",
                                    activeTab === item.id ? "bg-orange-50 text-orange-700 dark:bg-orange-950/30 dark:text-orange-400" : "hover:bg-gray-50 dark:hover:bg-gray-800"
                                )}
                                onClick={() => handleTabClick(item)}
                                aria-current={activeTab === item.id ? "page" : undefined}
                            >
                                <div
                                    className={GlobalUtils.cn(
                                        "mr-2 p-1 rounded-md transition-all flex-shrink-0",
                                        activeTab === item.id
                                            ? "bg-orange-100 text-orange-600 dark:bg-orange-900/50 dark:text-orange-400"
                                            : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                                    )}
                                >
                                    {item.icon}
                                </div>
                                <span className="truncate">{item.label}</span>
                            </Button>
                        ))}
                    </nav>
                </CardContent>
            </Card>
        </div>
    );
}
