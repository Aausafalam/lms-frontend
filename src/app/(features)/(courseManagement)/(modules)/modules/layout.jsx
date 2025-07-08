"use client";

import DashboardLayout from "@/app/layouts/index";
import { ErrorBoundary } from "@/components/ErrorBoundary";

/**
 * Modules Layout Component
 * @description Layout wrapper for all module-related pages
 */
const ModulesLayout = ({ children }) => {
    return (
        <DashboardLayout>
            <ErrorBoundary>
                <div id="modules_module" className="modules-module">
                    {children}
                </div>
            </ErrorBoundary>
        </DashboardLayout>
    );
};

export default ModulesLayout;
