"use client";

import { Badge } from "@/components/ui/badge";
import type { SkillType } from "./course-data";
import GlobalUtils from "@/lib/utils";

interface SkillCardProps {
    skill: SkillType;
    compact?: boolean;
}

export function SkillCard({ skill, compact = false }: SkillCardProps) {
    // Get badge color based on skill level
    const getBadgeColor = (level: string) => {
        switch (level) {
            case "Advanced":
                return "bg-purple-600 hover:bg-purple-700 text-white";
            case "Intermediate":
                return "bg-blue-600 hover:bg-blue-700 text-white";
            case "Beginner":
                return "bg-green-600 hover:bg-green-700 text-white";
            default:
                return "bg-gray-600 hover:bg-gray-700 text-white";
        }
    };

    // Ultra compact version for mobile
    if (compact) {
        return (
            <div className="flex items-center justify-between p-2 rounded-lg border border-gray-100 dark:border-gray-800 hover:border-purple-200 dark:hover:border-purple-800/40 hover:bg-purple-50/30 dark:hover:bg-purple-900/10 transition-all">
                <span className="text-sm font-medium text-gray-900 dark:text-white">{skill.name}</span>
                <Badge className={GlobalUtils.cn("text-xs", getBadgeColor(skill.level))}>{skill.level}</Badge>
            </div>
        );
    }

    // Standard version for desktop
    return (
        <div className="flex items-center justify-between p-3 rounded-lg border border-gray-100 dark:border-gray-800 hover:border-purple-200 dark:hover:border-purple-800/40 hover:bg-purple-50/30 dark:hover:bg-purple-900/10 transition-all">
            <div>
                <h3 className="font-medium text-gray-900 dark:text-white">{skill.name}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">{skill.category}</p>
            </div>
            <Badge className={getBadgeColor(skill.level)}>{skill.level}</Badge>
        </div>
    );
}
