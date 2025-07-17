"use client";

import DashboardLayout from "@/app/layouts/index";
import { ErrorBoundary } from "@/components/ErrorBoundary";

/**
 * Exams Layout Component
 * @description Layout wrapper for all exam-related pages
 */
const ExamsLayout = ({ children }) => {
    return (
        <DashboardLayout>
            <ErrorBoundary>
                <div id="exams_exam" className="exams-exam">
                    {children}
                </div>
            </ErrorBoundary>
        </DashboardLayout>
    );
};

export default ExamsLayout;
