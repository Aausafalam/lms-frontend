"use client";

import DashboardLayout from "@/app/layouts/index";
import { ErrorBoundary } from "@/components/ErrorBoundary";

/**
 * Videos Layout Component
 * @description Layout wrapper for all video-related pages
 */
const VideosLayout = ({ children }) => {
    return (
        <DashboardLayout>
            <ErrorBoundary>
                <div id="videos_video" className="videos-video">
                    {children}
                </div>
            </ErrorBoundary>
        </DashboardLayout>
    );
};

export default VideosLayout;
