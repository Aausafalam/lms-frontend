"use client";

import { FileText, BookOpen, Target, PresentationIcon, BarChart3, Settings } from "lucide-react";
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
    ];

    return (
        <div lassName="sticky top-8 max-w-48">
            {/* Main Navigation Card */}
            <Card className="overflow-hidden border-0  bg-white dark:bg-gray-900 dark:border-gray-800">
                <CardHeader className="bg-blue-50 dark:bg-blue-950/20 border-b border-blue-200 dark:border-blue-800">
                    <CardTitle className="text-sm text-blue-800 dark:text-blue-200 flex items-center">
                        <Settings className="h-4 w-4 mr-2" />
                        Navigation
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-2">
                    <nav className="space-y-1">
                        {navigationItems.map((item) => (
                            <Button
                                key={item.id}
                                variant="ghost"
                                className={GlobalUtils.cn(
                                    "w-full justify-start text-left mb-1 font-normal transition-all px-3 py-2 h-auto",
                                    activeTab === item.id
                                        ? "bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400 border border-blue-200 dark:border-blue-800"
                                        : "hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                                )}
                                onClick={() => setActiveTab(item.id)}
                            >
                                <div className="flex items-start space-x-3 w-full">
                                    <div
                                        className={GlobalUtils.cn(
                                            "p-1.5 rounded-md transition-all flex-shrink-0 mt-0.5",
                                            activeTab === item.id ? "bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400" : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                                        )}
                                    >
                                        {item.icon}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="font-medium text-sm">{item.label}</div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.description}</div>
                                    </div>
                                </div>
                            </Button>
                        ))}
                    </nav>
                </CardContent>
            </Card>

            {/* Quick Stats Card */}
            <Card className="border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                <CardHeader className="bg-blue-50 dark:bg-blue-950/20 border-b border-blue-200 dark:border-blue-800">
                    <CardTitle className="text-sm text-blue-800 dark:text-blue-200 flex items-center">
                        <BarChart3 className="h-4 w-4 mr-2" />
                        Quick Stats
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Total Sections</span>
                        <Badge className="bg-blue-100 text-blue-700 border-blue-200">3</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Questions</span>
                        <Badge className="bg-blue-100 text-blue-700 border-blue-200">80</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Duration</span>
                        <Badge className="bg-blue-100 text-blue-700 border-blue-200">90 min</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Status</span>
                        <Badge className="bg-green-100 text-green-700 border-green-200">Published</Badge>
                    </div>
                </CardContent>
            </Card>

            {/* Action Card */}
            <Card className="border-gray-200 dark:border-gray-800 bg-gradient-to-br from-orange-500 to-orange-600 text-white">
                <CardContent className="p-4 text-center">
                    <div className="space-y-3">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full">
                            <Target className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-white">Take Practice Test</h3>
                            <p className="text-white/80 text-xs mt-1">Test this exam pattern</p>
                        </div>
                        <Button size="sm" className="w-full bg-white text-orange-600 hover:bg-gray-100 font-medium">
                            Start Test
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
