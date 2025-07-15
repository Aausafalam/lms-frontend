"use client";

import DashboardLayout from "@/app/layouts/index";
import { ErrorBoundary } from "@/components/ErrorBoundary";

/**
 * ExamPatterns Layout Component
 * @description Layout wrapper for all examPattern-related pages
 */
const ExamPatternsLayout = ({ children }) => {
    return (
        <DashboardLayout>
            <ErrorBoundary>
                <div id="examPatterns_examPattern" className="examPatterns-examPattern">
                    {children}
                </div>
            </ErrorBoundary>
        </DashboardLayout>
    );
};

export default ExamPatternsLayout;
