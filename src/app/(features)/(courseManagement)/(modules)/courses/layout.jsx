"use client";

import DashboardLayout from "@/app/layouts/index";
import { ErrorBoundary } from "@/components/ErrorBoundary";

/**
 * Courses Layout Component
 * @description Layout wrapper for all course-related pages
 */
const CoursesLayout = ({ children }) => {
    return (
        <DashboardLayout>
            <ErrorBoundary>
                <div id="courses_module" className="courses-module">
                    {children}
                </div>
            </ErrorBoundary>
        </DashboardLayout>
    );
};

export default CoursesLayout;
