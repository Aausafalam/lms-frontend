"use client";

import DashboardLayout from "@/app/layouts/index";
import { ErrorBoundary } from "@/components/ErrorBoundary";

/**
 * Lessons Layout Component
 * @description Layout wrapper for all lesson-related pages
 */
const LessonsLayout = ({ children }) => {
    return (
        <DashboardLayout>
            <ErrorBoundary>
                <div id="lessons_lesson" className="lessons-lesson">
                    {children}
                </div>
            </ErrorBoundary>
        </DashboardLayout>
    );
};

export default LessonsLayout;
