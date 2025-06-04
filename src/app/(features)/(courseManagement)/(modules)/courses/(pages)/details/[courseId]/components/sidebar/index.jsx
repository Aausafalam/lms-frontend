"use client";

import { FileText, ImageIcon, BookOpen, Target, Link2, Users, PresentationIcon, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import GlobalUtils from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export function SidebarNavigation({ activeTab, setActiveTab }) {
    const navigationItems = [
        { id: "overview", label: "Overview", icon: <FileText className="h-4 w-4" /> },
        { id: "modules", label: "Modules", icon: <ImageIcon className="h-4 w-4" /> },
        // { id: "lessons", label: "Lessons", icon: <ImageIcon className="h-4 w-4" /> },
        { id: "assignments", label: "Assignments", icon: <BookOpen className="h-4 w-4" /> },
        { id: "quiz", label: "Quiz", icon: <Target className="h-4 w-4" /> },
        { id: "syllabus", label: "Syllabus", icon: <Award className="h-4 w-4" /> },
    ];

    const router = useRouter();
    const searchParams = useSearchParams();

    const handleClick = (item) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("courseId", item.id); // Set or update courseId
        router.push(`?${params.toString()}`);
        setActiveTab(item.id); // update local tab state
    };

    return (
        <div className="sticky top-8 max-w-48">
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
                                onClick={() => handleClick(item)}
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
