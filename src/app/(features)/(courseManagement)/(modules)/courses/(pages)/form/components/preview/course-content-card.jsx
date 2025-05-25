"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

/**
 * Reusable Course Content Card Component
 * Used for displaying various course sections with consistent styling
 */
export function CourseContentCard({ title, subTitle, icon, Icon, children, collapsible = false, defaultExpanded = true, headerColor = "blue", isMobile = false }) {
    const [isExpanded, setIsExpanded] = useState(defaultExpanded);

    const colorClasses = {
        blue: "bg-blue-50 dark:bg-blue-950/20 border-blue-100 dark:border-blue-900/20 text-blue-600 dark:text-blue-400",
        purple: "bg-purple-50 dark:bg-purple-950/20 border-purple-100 dark:border-purple-900/20 text-purple-600 dark:text-purple-400",
        orange: "bg-orange-50 dark:bg-orange-950/20 border-orange-100 dark:border-orange-900/20 text-orange-600 dark:text-orange-400",
        green: "bg-green-50 dark:bg-green-950/20 border-green-100 dark:border-green-900/20 text-green-600 dark:text-green-400",
        indigo: "bg-indigo-50 dark:bg-indigo-950/20 border-indigo-100 dark:border-indigo-900/20 text-indigo-600 dark:text-indigo-400",
        white: "bg-white-50 dark:bg-white-950/20 border-white-100 dark:border-white-900/20 text-white-600 dark:text-white-400",
    };

    return (
        <Card className="rounded-lg shadow-sm overflow-hidden border-gray-100 bg-white dark:bg-gray-900 dark:border-gray-800">
            {/* Header */}
            <div className={`p-4 border-b ${colorClasses[headerColor]}`}>
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className={`font-semibold flex gap-2 items-center ${isMobile ? "text-md" : "text-lg"}`}>
                            {icon || Icon ? icon || <Icon className={"w-[1.1rem] h-[1.1rem]"} /> : ""}
                            {title}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mt-0.5 ml-0.5 text-xs">{subTitle || "What you'll learn in this module"}</p>
                    </div>
                    {collapsible && (
                        <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)} className="hover:bg-white/50 dark:hover:bg-gray-800/50">
                            {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                        </Button>
                    )}
                </div>
            </div>

            {/* Content */}
            {(!collapsible || isExpanded) && <div className="p-4">{children}</div>}
        </Card>
    );
}
