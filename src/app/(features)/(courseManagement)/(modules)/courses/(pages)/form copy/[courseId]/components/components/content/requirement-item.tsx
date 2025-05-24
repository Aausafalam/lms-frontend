"use client";

import GlobalUtils from "@/lib/utils";
import { CheckCircle } from "lucide-react";

interface RequirementItemProps {
    requirement: string;
    compact?: boolean;
}

export function RequirementItem({ requirement, compact = false }: RequirementItemProps) {
    return (
        <div
            className={GlobalUtils.cn(
                "flex items-start rounded-xl border border-gray-100 dark:border-gray-800 hover:border-green-200 dark:hover:border-green-800/40 hover:bg-green-50/30 dark:hover:bg-green-900/10 transition-all group",
                compact ? "p-2.5" : "p-3"
            )}
        >
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3 mt-0.5 group-hover:bg-green-200 dark:group-hover:bg-green-800/40 transition-colors">
                <CheckCircle className="h-3 w-3 text-green-600 dark:text-green-400" />
            </div>
            <p className={GlobalUtils.cn("text-gray-700 dark:text-gray-300", compact ? "text-sm" : "text-base")}>{requirement}</p>
        </div>
    );
}
