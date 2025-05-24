"use client";

import Stats from "@/components/stats";
import { Users, UserCheck, UserX, UserCog, Clock } from "lucide-react";
import React from "react";

const InstructorStats = ({ className }) => {
    const generateData = (data) => {
        return {
            grid: 5,
            gridItems: [
                {
                    title: "Total Instructors",
                    value: data?.totalInstructors || 156,
                    icon: <Users className="h-5 w-5" />,
                    variant: "blue",
                    trend: null,
                },
                {
                    title: "Active Instructors",
                    value: data?.activeInstructors || 89,
                    icon: <UserCheck className="h-5 w-5" />,
                    variant: "green",
                    trend: { value: 12, isPositive: true },
                },
                {
                    title: "Inactive Instructors",
                    value: data?.inactiveInstructors || 42,
                    icon: <UserX className="h-5 w-5" />,
                    variant: "orange",
                    trend: null,
                },
                {
                    title: "New Instructors",
                    value: data?.newInstructors || 23,
                    icon: <UserCog className="h-5 w-5" />,
                    variant: "purple",
                    trend: { value: 8, isPositive: true },
                },
                {
                    title: "Avg. Tenure (months)",
                    value: data?.avgTenure || 18,
                    icon: <Clock className="h-5 w-5" />,
                },
            ],
            url: "/get-instructor-stats",
            method: "GET",
        };
    };

    return <Stats generateData={generateData} className={className} />;
};

export default InstructorStats;
