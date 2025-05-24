"use client";

import GlobalUtils from "@/lib/utils";
import { Check } from "lucide-react";

interface LearningObjectiveProps {
    objective: string;
    compact?: boolean;
}

export function LearningObjective({ objective, compact = false }: LearningObjectiveProps) {
    return (
        <div
            className={GlobalUtils.cn(
                "flex items-start rounded-xl border border-gray-100 dark:border-gray-800 hover:border-blue-200 dark:hover:border-blue-800/40 hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-all group",
                compact ? "p-2.5" : "p-3"
            )}
        >
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3 mt-0.5 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/40 transition-colors">
                <Check className="h-3 w-3 text-blue-600 dark:text-blue-400" />
            </div>
            <p className={GlobalUtils.cn("text-gray-700 dark:text-gray-300", compact ? "text-sm" : "text-base")}>{objective}</p>
        </div>
    );
}
