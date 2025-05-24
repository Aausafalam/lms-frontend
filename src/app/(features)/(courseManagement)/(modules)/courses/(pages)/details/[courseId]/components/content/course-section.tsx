"use client";

import type { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { useDevice, devicePresets } from "./device-context";
import GlobalUtils from "@/lib/utils";

interface CourseSectionProps {
    title: string;
    icon: ReactNode;
    iconBgClass: string;
    headerBgClass?: string;
    headerBorderClass?: string;
    children: ReactNode;
    className?: string;
}

export function CourseSection({ title, icon, iconBgClass, headerBgClass = "", headerBorderClass = "", children, className = "" }: CourseSectionProps) {
    const { previewWidth } = useDevice();

    // Determine device type based on viewport width
    const isMobile = previewWidth <= devicePresets.mobile;

    return (
        <Card className={GlobalUtils.cn("bg-white dark:bg-gray-900 shadow-md border-0 rounded-xl overflow-hidden", className)}>
            <div className={GlobalUtils.cn("p-4 border-b", headerBgClass, headerBorderClass)}>
                <h2 className={`font-bold text-gray-900 dark:text-white flex items-center ${isMobile ? "text-lg" : "text-xl"}`}>
                    <div className={GlobalUtils.cn("h-7 w-7 rounded-full flex items-center justify-center mr-3", iconBgClass)}>{icon}</div>
                    {title}
                </h2>
            </div>
            <div className="p-4 md:p-5">{children}</div>
        </Card>
    );
}
