"use client";

import { FileText, BookOpen, Target, PresentationIcon, BarChart3, Settings, Tornado, BookCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import GlobalUtils from "@/lib/utils";

/**
 * SidebarNavigation Component
 * Navigation sidebar with standard theme and additional features
 * Provides quick access to different sections of exam pattern details
 */
export function SidebarNavigation({ activeTab, setActiveTab }) {
    const navigationItems = [
        {
            id: "overview",
            label: "Overview",
            icon: <FileText className="h-4 w-4" />,
            description: "General exam information",
        },
        {
            id: "exam_list",
            label: "Exam List",
            icon: <BookCheck className="h-4 w-4" />,
            description: "General exam information",
        },
    ];

    return (
        <div lassName="sticky top-8 max-w-48">
            {/* Main Navigation Card */}
            <Card className="overflow-hidden border-0  bg-white dark:bg-gray-900 dark:border-gray-800">
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

            {/* Quick Stats Card */}
            {/* <Card className="border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 mt-4 shadow-sm overflow-hidden">
                <CardHeader className="bg-orange-50 dark:bg-orange-950/20 border-b border-orange-200 dark:border-orange-800 py-5">
                    <CardTitle className="text-sm text-orange-800 dark:text-orange-200 flex items-center">
                        <BarChart3 className="h-4 w-4 mr-2" />
                        Quick Stats
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Total Sections</span>
                        <Badge className="bg-orange-100 text-orange-700 border-orange-200 shadow-none">3</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Questions</span>
                        <Badge className="bg-orange-100 text-orange-700 border-orange-200 shadow-none">80</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Duration</span>
                        <Badge className="bg-orange-100 text-orange-700 border-orange-200 shadow-none">90 min</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Status</span>
                        <Badge className="bg-green-100 text-green-700 border-green-200 shadow-none">Published</Badge>
                    </div>
                </CardContent>
            </Card> */}
        </div>
    );
}
