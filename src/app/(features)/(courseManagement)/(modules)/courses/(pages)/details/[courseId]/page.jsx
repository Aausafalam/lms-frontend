"use client";

import { courseDetailsData } from "./data/course-data";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Briefcase, LayoutDashboard } from "lucide-react";
import { SidebarNavigation } from "./components/sidebar";
import CourseDetailsContent from "./components/content";
import { useState } from "react";
import { useParams } from "next/navigation";
import CourseDetailsHeader from "./components/header";

export default function CourseDetailsPage() {
    const [activeTab, setActiveTab] = useState("overview");
    const { courseId } = useParams();

    return (
        <div className="transition-colors duration-300 max-w-[1400px]">
            <CourseDetailsHeader courseId={courseId} />

            <div className="flex gap-4">
                <SidebarNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
                <div className="w-full">
                    <CourseDetailsContent activeTab={activeTab} />
                </div>
            </div>
        </div>
    );
}
