"use client";

import { useState } from "react";
import { instructorData } from "../data/instructor-data";
import InstructorHero from "./sections/hero";
import InstructorBasicInfo from "./sections/basicInfo";
import InstructorOverview from "./sections/overview";
import InstructorCourses from "./sections/courses";
import InstructorReviews from "./sections/reviews";
import InstructorSchedule from "./sections/schedule";
import InstructorAchievements from "./sections/achievements";
import { SparkleIcon } from "lucide-react";
import Tabs from "@/components/tab";

export function InstructorProfile({ instructor = instructorData, onEdit, onDelete }) {
    const [activeTab, setActiveTab] = useState({ id: "overview", label: "Overview" });

    const tabs = [
        { id: "overview", label: "Overview", content: <InstructorOverview instructor={instructor} />, icon: <SparkleIcon className="size-4" /> },
        { id: "courses", label: "Courses", content: <InstructorCourses instructor={instructor} />, icon: <SparkleIcon className="size-4" /> },
        { id: "reviews", label: "Reviews", content: <InstructorReviews instructor={instructor} />, icon: <SparkleIcon className="size-4" /> },
        { id: "schedule", label: "Schedule", content: <InstructorSchedule instructor={instructor} />, icon: <SparkleIcon className="size-4" /> },
        { id: "achievements", label: "Achievements", content: <InstructorAchievements instructor={instructor} />, icon: <SparkleIcon className="size-4" /> },
    ];

    return (
        <div className="space-y-6">
            {/* Header section with profile banner */}
            <InstructorHero instructor={instructor} />

            {/* Profile header with image and basic info */}
            <InstructorBasicInfo instructor={instructor} onDelete={onDelete} onEdit={onEdit} />

            {/* Tabs for different sections */}
            <div className="mb-12 mt-2" id="instructor-overview">
                <Tabs defaultTab={activeTab} tabs={tabs} variant={"underline"} onTabChange={(tab) => setActiveTab(tab)} />
            </div>
        </div>
    );
}

// Helper function to get the appropriate icon for social links
