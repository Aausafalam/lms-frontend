"use client";

import { instructorData } from "./data/instructor-data";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Briefcase, LayoutDashboard } from "lucide-react";
import { InstructorProfile } from "./components/instructor-profile";

export default function InstructorDetailsPage({ instructor = instructorData }) {
    const breadcrumbItems = [
        {
            title: "Instructors",
            href: "/instructors",
            icon: <LayoutDashboard className="h-3.5 w-3.5" />,
        },
        {
            title: "Instructor Details",
            href: `instructors/details/1`,
            icon: <Briefcase className="h-3.5 w-3.5" />,
        },
    ];

    return (
        <div className="transition-colors duration-300">
            <Breadcrumb items={breadcrumbItems} className={"mb-4"} />
            <InstructorProfile instructor={instructor} />
        </div>
    );
}
