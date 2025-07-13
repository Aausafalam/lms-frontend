"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import VideoDetailsContent from "./components/content";
import VideoDetailsHeader from "./components/header";
import { ErrorBoundary } from "@/components/ErrorBoundary";

/**
 * Video Details Page Component
 * @description Main page component for displaying video details with tabbed navigation
 */
export default function VideoDetailsPage() {
    const [activeTab, setActiveTab] = useState("overview");
    const [isMobile, setIsMobile] = useState(false);
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const { videoId } = useParams();

    // Check if mobile view
    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth < 1024;
            setIsMobile(mobile);
            // Auto-close sidebar when switching to desktop
            if (!mobile) {
                setSidebarVisible(false);
            }
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    if (!videoId) {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-gray-500">Video ID is required</p>
            </div>
        );
    }

    return (
        <ErrorBoundary>
            <div className="transition-colors duration-300">
                <VideoDetailsHeader videoId={videoId} />

                <div className="">
                    <VideoDetailsContent activeTab={activeTab} />
                </div>
            </div>
        </ErrorBoundary>
    );
}
