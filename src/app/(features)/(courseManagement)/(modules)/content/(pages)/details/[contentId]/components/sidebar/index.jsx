"use client";

import { FileText, FileAudio, Tag, PresentationIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import GlobalUtils from "@/lib/utils";

export function SidebarNavigation({ activeTab, setActiveTab }) {
    const navigationItems = [
        { id: "overview", label: "Overview", icon: <FileText className="h-4 w-4" /> },
        { id: "quiz", label: "Quiz", icon: <FileAudio className="h-4 w-4" /> },
        { id: "assignment", label: "Assignments", icon: <Tag className="h-4 w-4" /> },
        { id: "transcript", label: "Transcript", icon: <PresentationIcon className="h-4 w-4" /> },
    ];

    return (
        <div className="sticky top-8 max-w-48">
            <Card className="overflow-hidden border-0 bg-white dark:bg-gray-900 dark:border-gray-800">
                <CardContent className="p-2">
                    <nav className="space-y-1">
                        {navigationItems.map((item) => (
                            <Button
                                key={item.id}
                                variant="ghost"
                                className={GlobalUtils.cn(
                                    "w-full justify-start text-left mb-1 font-normal transition-all px-2 ",
                                    activeTab === item.id ? "bg-orange-50 text-orange-700 dark:bg-orange-950/30 dark:text-orange-400" : ""
                                )}
                                onClick={() => setActiveTab(item.id)}
                            >
                                <div
                                    className={GlobalUtils.cn(
                                        "mr-2 p-1 rounded-md transition-all",
                                        activeTab === item.id
                                            ? "bg-orange-100 text-orange-600 dark:bg-orange-900/50 dark:text-orange-400"
                                            : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                                    )}
                                >
                                    {item.icon}
                                </div>
                                {item.label}
                            </Button>
                        ))}
                    </nav>
                </CardContent>
            </Card>
        </div>
    );
}
