"use client";

import DashboardLayout from "@/app/layouts/index";
import { ErrorBoundary } from "@/components/ErrorBoundary";

/**
 * Questions Layout Component
 * @description Layout wrapper for all question-related pages
 */
const QuestionsLayout = ({ children }) => {
    return (
        <DashboardLayout>
            <ErrorBoundary>
                <div id="questions_question" className="questions-question">
                    {children}
                </div>
            </ErrorBoundary>
        </DashboardLayout>
    );
};

export default QuestionsLayout;
